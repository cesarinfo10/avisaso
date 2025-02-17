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
  public rotations: number[] = []; // Array para almacenar las rotaciones


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
    if (this.photos.length >= 4) {
      const alert = await this.alertCtrl.create({
        header: 'Límite alcanzado',
        message: 'Solo puedes cargar hasta 4 imágenes.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
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
      this.rotations.push(0); // Agrega la rotación correspondiente
      this.guardarFotos(base64Image);
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
      if (this.photos.length >= 4) {
        const alert = await this.alertCtrl.create({
          header: 'Límite alcanzado',
          message: 'Solo puedes cargar hasta 4 imágenes.',
          buttons: ['OK']
        });
        await alert.present();
        return;
      }
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
        this.rotations.push(0); 
        this.guardarFotos(base64Image);
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


    async guardarFotos(base64Image: string) {  
      const datos = {
        id_trabajo: 1,
        foto: base64Image,
        estado: '1'
      };

      console.log('Datos de la foto:', datos);
      this.servicioJob.subirAlbum(datos)
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
    }

    eliminarFoto(index: number) {
      this.photos.splice(index, 1);
      this.rotations.splice(index, 1); // Elimina la rotación correspondiente
    }
  
    girarFoto(index: number) {
      this.rotations[index] = (this.rotations[index] + 90) % 360; // Incrementa la rotación en 90 grados
    }
    limpiarRegistro() {
      this.nomTrabajo = '';
      this.descripcion = '';
      this.estado = '1';
    }
}
