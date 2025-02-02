import { Component, OnInit } from '@angular/core';
import { TrabajosService } from '../../../services/trabajos/trabajos.service';
import { NavController, AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cargar-trabajo',
  templateUrl: './cargar-trabajo.page.html',
  styleUrls: ['./cargar-trabajo.page.scss'],
})
export class CargarTrabajoPage implements OnInit {

  nomTrabajo: string = '';
  descripcion: string = '';
  estado: string = '1'; // Valor predeterminado
  public isCardVisible: boolean = true;
  public photos: string[] = [];

  constructor(private camera: Camera,
              private servicioJob:TrabajosService,
              private navCtrl: NavController,
              private alertCtrl: AlertController,
              private http: HttpClient) { }

  ngOnInit() {

  }

  guardarTrabajo() {
    console.log('Valor de nomTrabajo:', this.nomTrabajo); // Agrega este log para verificar el valor de nomTrabajo
    const datos = {
      titulo: this.nomTrabajo,
      dni_usuario: localStorage.getItem('dni') || undefined,
      descripcion: this.descripcion,
      estado: this.estado,
    };
        //console.log('Valor de usuarioServ:', datos); // Agrega este log para verificar el valor de usuarioServ
        this.servicioJob.newJob(datos)
        .then(
          async data => {
            if (data === 'error') {
              const alert = await this.alertCtrl.create({
                header: 'Error',
                message: 'Error al registrar el trabajo',
                buttons: ['OK']
              });
              await alert.present();
              return;
            }else{
            const alert = await this.alertCtrl.create({
              header: 'Registro exitoso',
              message: 'Trabajo registrado con éxito',
              buttons: ['OK']
            });
            await alert.present();
            console.log(data);
            localStorage.setItem('id_job', data as any);
            this.isCardVisible = false;
            this.limpiarRegistro();
          }
          }
        )
        .catch(
          error => {
            const alert = this.alertCtrl.create({
              header: 'Error',
              message: 'Error al registrar usuario'+ error,
              buttons: ['OK']
            });
          }
        );
    }

  /*=============================================
	CARGAR IMAGEN DESDE LA LIBRERIA
	=============================================*/
  async libreria() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    };
    try {
      const imageData = await this.camera.getPicture(options);
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      this.photos.push(base64Image);
    } catch (error) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Error al tomar la foto: ' + error,
        buttons: ['OK']
      });
      await alert.present();
    }
  }

    async takePhoto() {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      };

      try {
        const imageData = await this.camera.getPicture(options);
        const base64Image = 'data:image/jpeg;base64,' + imageData;
        this.photos.push(base64Image);
        console.log('Foto seleccionada:', base64Image);
        console.log('Fotos en la variable photos:', JSON.stringify(this.photos, null, 2));
      } catch (error) {
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'Error al tomar la foto: ' + error,
          buttons: ['OK']
        });
        await alert.present();
      }
    }

    async verVariableFotos() {
      console.log('Fotos en la variable photos:', JSON.stringify(this.photos, null, 2));
    }


    async guardarFotos() {
      // Verificar que todas las fotos están en la variable photos
      console.log('Fotos en la variable photos:', JSON.stringify(this.photos, null, 2));
  
      const fotosBase64 = this.photos.map(photo => {
        return {
          base64: photo
        };
      });
  
      console.log('Fotos a enviar:', JSON.stringify(fotosBase64, null, 2));
  
      try {
        const response = await this.servicioJob.subirAlbum({ fotos: fotosBase64 });
        console.log('Respuesta del servidor:', response);
        const alert = await this.alertCtrl.create({
          header: 'Registro exitoso',
          message: 'Fotos subidas con éxito',
          buttons: ['OK']
        });
        await alert.present();
      } catch (error) {
        console.error('Error al subir las fotos:', error);
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'Error al subir las fotos: ' + error,
          buttons: ['OK']
        });
        await alert.present();
      }
    }

    limpiarRegistro() {
      this.nomTrabajo = '';
      this.descripcion = '';
      this.estado = '1';
    }
}
