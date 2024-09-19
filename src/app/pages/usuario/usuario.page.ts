import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NavController, AlertController } from '@ionic/angular';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

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
  latitud: number | null = null;
  longitud: number | null = null;
  foto_perfil: string = '';
  usuario: string = '';
  id_notificaciones: string = '';
  carta_presentacion: string = '';
  estado: string = '';
  telefono: string = '';
  isMobile: boolean = false;


  constructor(private platform: Platform, private camera: Camera, private navCtrl: NavController,
    private alertCtrl: AlertController, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.isMobile = this.platform.is('mobile') || this.platform.is('android') || this.platform.is('ios');
    this.route.queryParams.subscribe(params => {
      this.direccion = params['direccion'] || null;
      this.telefono = params['telefono'] || '';
      this.correo = params['correo'] || '';
      this.tipo_usuario = params['tipo_usuario'] || '';
      this.latitud = params['latitud'] ? parseFloat(params['latitud']) : null;
      this.longitud = params['longitud'] ? parseFloat(params['longitud']) : null;
      console.log('Datos recibidos:', this.direccion, this.telefono, this.correo, this.tipo_usuario, this.latitud, this.longitud);
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
        tipo_usuario: this.tipo_usuario
      }
    });
  }
  /*guardarImageReporte() {
    this.servicio.addImageReporte(
      this.idReporte,
      this.urlImage,
      this.image,
      this.idUsuario
    )
      .then(
        async data => {
          console.log(data);
        }
      )
      .catch(
        error => {
          console.log(error + 'no se pudo insertar datos');
        }
      );

  }*/
}
