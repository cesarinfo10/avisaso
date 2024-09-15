import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { environment } from 'src/environments/environment';

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
  foto_perfil: string = '';
  usuario: string = '';
  id_notificaciones: string = '';
  carta_presentacion: string = '';
  estado: string = '';
  telefono: string = '';
  constructor(private camera: Camera) { }

  ngOnInit() {
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
}
