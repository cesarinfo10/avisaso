import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NavController, AlertController } from '@ionic/angular';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { HttpClient } from '@angular/common/http';

const apiUrl = environment.apiUrl;
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {

  tipo_usuario: string = '';
  correo: string = '';
  celular: string = '';
  direccion: string = '';
  latitud:  string = '';
  longitud:  string = '';
  dni: string = '';
  foto_perfil: string = '';
  usuario: string = '';
  id_notificaciones: string = '';
  carta_presentacion: string = '';
  estado: string = '';
  telefono: string = '';
  isMobile: boolean = false;
  presentacion: string = '';
  prefijo: string = '+549'; // Prefijo por defecto

  public image: string= apiUrl+'/assets/perfil.png';

  public navegador: any;

  constructor(private servicio: UserService,
              private platform: Platform,
              private camera: Camera,
              private navCtrl: NavController,
              private alertCtrl: AlertController,
              private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient) {
                this.consultarUser();
                this.detectarPais();
               }

  ngOnInit() {
    this.isMobile = this.platform.is('mobile') || this.platform.is('android') || this.platform.is('ios');
    this.route.queryParams.subscribe(params => {
      this.direccion = params['direccion'] || null;
      this.telefono = params['telefono'] || '';
      this.correo = params['correo'] || '';
      this.tipo_usuario = params['tipo_usuario'] || '';
      this.latitud = params['latitud']  || '';
      this.longitud = params['longitud']  || '';
      this.presentacion = params['presentacion'] || '';
      console.log('Datos recibidos:', this.direccion, this.telefono, this.correo, this.tipo_usuario, this.latitud, this.longitud, this.presentacion);
    });
  }
  /*=============================================
	CARGAR IMAGEN DESDE LA CAMARÁ
	=============================================*/
  camara() {
    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100,
      correctOrientation: true,
      cameraDirection: this.camera.Direction.FRONT // Usar la cámara frontal
    };
    this.procesarImagen(options);
  }
  async avisoPro(){
    if (this.tipo_usuario === '3'){
    const alert = await this.alertCtrl.create({
          header: 'Registro de usuario',
          message: 'Recuerde que posee 3 meses gratis, luego de este periodo se cobrará una pequeña cuota mensual.'
          +' Si ya fue cliente el cobro se realzará el mes siguiente.',
          buttons: ['OK']
        });
        await alert.present();
    }


  }
  /*=============================================
	CARGAR IMAGEN DESDE LA LIBRERIA
	=============================================*/
  libreria(){
    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    this.procesarImagen(options);
  }
  /*=============================================
	PROCESAR IMAGEN
	=============================================*/
  procesarImagen(options: CameraOptions){
    this.camera.getPicture(options)
      .then(imageData => {
        this.foto_perfil = `data:image/jpeg;base64,${imageData}`;
        this.image = `data:image/jpeg;base64,${imageData}`;
        console.log(this.foto_perfil);
      })
      .catch(error => {
        console.error(error);
      });
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64Image = e.target.result;
        this.foto_perfil = base64Image;
        this.image = base64Image;
        console.log(base64Image);
      };
      reader.readAsDataURL(file);
    }
  }

  verMapa() {
    this.router.navigate(['/map'], {
      queryParams: {
        telefono: this.telefono,
        correo: this.correo,
        tipo_usuario: this.tipo_usuario,
        presentacion: this.presentacion
      }
    });
  }
  /*=============================================
	UPDATE USUARIO POS SESIÓN
	=============================================*/
  guardarUsuario() {
    if (!this.validarCelular(this.celular)) {
      this.mostrarAlertaVarios('Número de celular inválido', 'Por favor, ingrese un número de celular válido.');
      return;
    }
    const usuarioDto = {
          tipo_usuario: this.tipo_usuario,
          correo: this.correo,
          celular: this.prefijo + this.celular,
          telefono: this.prefijo + this.telefono,
          direccion: this.direccion,
          latitud: this.latitud,
          longitud: this.longitud,
          foto_perfil: this.foto_perfil,
          usuario: this.usuario,
          presentacion:this.presentacion,
          dni: localStorage.getItem('dni') || undefined
        };

    this.servicio.addUser(usuarioDto)
      .then(
        async data => {
          console.log(data);
          if (data !== 1) {
            const alert = await this.alertCtrl.create({
              header: 'Registro de usuario',
              message: 'Error al registrar usuario',
              buttons: ['OK']
            });
            await alert.present();
            return;
          } else{
            const alert = await this.alertCtrl.create({
              header: 'Registro de usuario',
              message: 'Usuario registrado con éxito',
              buttons: [
                {
                  text: 'OK',
                  handler: () => {
                    this.limpiarCampos();
                    this.mostrarAlerta();
                  }
                }
              ]
            });
            await alert.present();
          }
        }
      )
      .catch(
        error => {
          console.log(error + 'no se pudo insertar datos');
        }
      );

  }

  limpiarCampos() {
    this.tipo_usuario = '';
    this.correo = '';
    this.celular = '';
    this.telefono = '';
    this.direccion = '';
    this.latitud = '';
    this.longitud = '';
    this.foto_perfil = '';
    this.usuario = '';
    this.image = apiUrl+'/assets/perfil.png';;
    this.presentacion = '';
    this.navCtrl.navigateRoot('/home');
  }

  async mostrarAlertaVarios(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
  async mostrarAlerta() {
    const alert = await this.alertCtrl.create({
      header: 'Atención',
      message: 'Para que los cambios tengan efecto se cerrará la aplicación',
      buttons: [
        {
          text: 'OK',
          handler: async () => {
            localStorage.clear();
            if (this.platform.is('cordova')) {
              this.navCtrl.navigateRoot('/login');
            } else {
              // Si está en la web
              sessionStorage.clear();
              localStorage.clear();
              this.navCtrl.navigateRoot('/login');
            }
          }
        }
      ]
    });

    await alert.present();
  }
  async consultarUser() {

    const dni = localStorage.getItem('dni');
     if (dni) {
       this.servicio.selectOneUserPos(dni).subscribe(async data => {
        // console.log(data["dni"]);
       //  this.users = [data];
       this.tipo_usuario = data["tipo_usuario"] || '';
       this.correo = data["correo"] || '';
       this.celular = this.removePrefix(data["celular"] || '');
       this.telefono = this.removePrefix(data["telefono"] || '');
       this.direccion = data["direccion"] || '';
       this.latitud = data["latitud"] || '';
       this.longitud = data["longitud"] || '';
       this.foto_perfil = data["foto_perfil"] || '';
       this.usuario = data["usuario"] || '';
       this.image = data["foto_perfil"];
      this.presentacion = data["carta_presentacion"] || '';

       });
     }
   }

  // Función para eliminar el prefijo +549
  removePrefix(phoneNumber: string): string {
    if (phoneNumber.startsWith(this.prefijo)) {
      return phoneNumber.substring(this.prefijo.length);
    }
    return phoneNumber;
  }

    // Función para validar el número de celular
  validarCelular(celular: string): boolean {
    const regex = /^[0-9]{9,10}$/; // Asegúrate de que el número tenga 9 o 10 dígitos
    return regex.test(celular);
  }

      // Nueva función para detectar el país y ajustar el código de área
      detectarPais() {
        this.http.get('https://ipapi.co/json/').subscribe((data: any) => {
          const countryCode = data.country_code;
          switch (countryCode) {
            case 'AR':
              this.prefijo = '+549';
              break;
            case 'CL':
              this.prefijo = '+569';
              break;
            // Agrega más casos según sea necesario
            default:
              this.prefijo = '+549'; // Prefijo por defecto
          }
        });
      }


}
