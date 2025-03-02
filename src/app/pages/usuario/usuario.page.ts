import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NavController, AlertController } from '@ionic/angular';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

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

  public image: string= apiUrl+'/assets/perfil.png';

  public navegador: any;

  constructor(private servicio: UserService,
              private platform: Platform,
              private camera: Camera,
              private navCtrl: NavController,
              private alertCtrl: AlertController,
              private route: ActivatedRoute,
              private router: Router) {
                this.consultarUser();
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
    const usuarioDto = {
          tipo_usuario: this.tipo_usuario,
          correo: this.correo,
          celular: '+549'+this.celular,
          telefono: '+549'+this.telefono,
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
    if (phoneNumber.startsWith('+549')) {
      return phoneNumber.substring(4);
    }
    return phoneNumber;
  }
}
