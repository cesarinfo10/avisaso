import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ServiceService } from '../../../services/services/service.service';
import { LicitacionesPage } from '../licitaciones.page';

@Component({
  selector: 'app-licitacion-modal',
  templateUrl: './licitacion-modal.page.html',
  styleUrls: ['./licitacion-modal.page.scss'],
})
export class LicitacionModalPage implements OnInit {

  @Input() nomServicio: string | undefined;
  @Input() desNecesidad: string | undefined;
  @Input() idLicita: string | undefined;
  @Input() dni_usuario_licita: string | undefined;
  @Input() nombre_usuario_licita: string | undefined;
  @Input() responde: string | undefined;
  @Input() parent: LicitacionesPage | undefined;

  respuesta: string = '';
  precio: string = '';

 constructor(private modalController: ModalController,
             private servicio: ServiceService,
             private alertCtrl: AlertController){}

 cerrarModal() {
  this.modalController.dismiss();
}
  async ngOnInit() {
    if (this.responde === '1') {
      const alert =  this.alertCtrl.create({
        header: 'Respuesata enviada',
        message: 'Ya has respondido a esta, solo se permite una respuesta por licitación.',
        buttons: ['OK']
      });
       (await alert).present();
      return;
    }
  }

  formatPrecio(event: any) {
    const value = event.target.value.replace(/\D/g, '');
    const formattedValue = new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0, // Sin decimales
      maximumFractionDigits: 0  // Sin decimales
    }).format(parseFloat(value));
    this.precio = formattedValue;
  }

  async responder() {
    if (this.respuesta === '' || this.precio === '') {
      const alert = await this.alertCtrl.create({
        header: 'Campos Vacíos',
        message: 'Por favor, complete todos los campos antes de enviar.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
      const datos = {
        idLicita: this.idLicita,
        dni_usuario_licita: this.dni_usuario_licita,
        dni_usuario_responde: localStorage.getItem('dni') || undefined,
        respuesta: this.respuesta,
        precio_licitado: this.precio,
        responde: 1,
      };
      this.servicio.respuestaJOB(datos)
      .then(
        async data => {
          this.cerrarModal();
         // console.log(data);
            if (this.parent) {
            this.parent.consultarServivesUser(); // Llamar a la función del componente padre
          }
        }
      )
      .catch(
        error => {
          console.log(error);
        }
      );

  }
}
