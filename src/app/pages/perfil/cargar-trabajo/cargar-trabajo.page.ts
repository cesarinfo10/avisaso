import { Component, OnInit } from '@angular/core';
import { TrabajosService } from '../../../services/trabajos/trabajos.service';
import { NavController, AlertController, Platform } from '@ionic/angular';
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
  isMobile: boolean = false;

  public isCardVisible: boolean = true;
  public photos: string[] = [];
  public rotations: number[] = []; // Array para almacenar las rotaciones
  public isPhotoCardVisible: boolean = false;
  public photoIds: string[] = []; // Array para almacenar los IDs de las fotos

  constructor(private camera: Camera,
              private servicioJob:TrabajosService,
              private navCtrl: NavController,
              private alertCtrl: AlertController,
              private http: HttpClient,
              private platform: Platform,) { }

  ngOnInit() {
    this.isMobile = this.platform.is('mobile') || this.platform.is('android') || this.platform.is('ios');
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
            this.isPhotoCardVisible = true; // Mostrar la tarjeta de fotos
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

    onFileSelected(event: any) {
      const file: File = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const base64Image = e.target.result;
          this.photos.push(base64Image);
          this.rotations.push(0);
          this.guardarFotos(base64Image);
        };
        reader.readAsDataURL(file);
      }
    }

    async guarYsalir() {

      this.photoIds = [];
      // Eliminar id_job e id_foto del almacenamiento local
      localStorage.removeItem('id_job');
      localStorage.removeItem('id_foto');

      // Redirigir al menú de "Mi Perfil"
      this.navCtrl.navigateRoot('/perfil');
    }


    async guardarFotos(base64Image: string) {
      const datos = {
        id_trabajo: localStorage.getItem('id_job') || undefined,
        foto: base64Image,
        rotacion: 0,
        estado: '1'
      };

      console.log('Datos de la foto:', datos);
      this.servicioJob.subirAlbum(datos)
      .then(
        async data => {
          console.log(data);
          localStorage.setItem('id_foto', data as any);
          this.photoIds.push(data as any);
        }
      )
      .catch(
        error => {
          console.log(error + 'no se pudo insertar datos');
        }
      );
    }

    eliminarFoto(index: number) {
      const photoId = this.photoIds[index]; // Obtiene el ID de la foto
    // console.log('Valor de photoId:', photoId); // Agrega este log para verificar el valor de photoId
      this.servicioJob.eliminarFoto(photoId)
        .then(
          async data => {
            console.log(data);
            this.photos.splice(index, 1);
            this.photoIds.splice(index, 1); // Elimina el ID correspondiente
            this.rotations.splice(index, 1); // Elimina la rotación correspondiente
          }
        )
        .catch(
          error => {
            console.log(error + 'no se pudo eliminar la foto');
          }
        );
    }


    girarFoto(index: number) {
      this.rotations[index] = (this.rotations[index] + 90) % 360; // Incrementa la rotación en 90 grados
      this.guardarRotacion(index); // Guarda la nueva rotación en el servidor
    }

    async guardarRotacion(index: number) {
      const datos = {
        id: localStorage.getItem('id_foto') || undefined,
        id_trabajo: localStorage.getItem('id_job') || undefined,
        foto: this.photos[index],
        rotacion: this.rotations[index],
        estado: '1'
      };
      this.servicioJob.actualizarRotacion(datos)
        .then(
          async (data: any) => {
            console.log(data);
          }
        )
        .catch(
          (error: string) => {
            console.log(error + 'no se pudo actualizar la rotación');
          }
        );
    }

    limpiarRegistro() {
      this.nomTrabajo = '';
      this.descripcion = '';
      this.estado = '1';
    }
}
