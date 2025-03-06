import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/services/service.service';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { LicitacionModalPage } from './licitacion-modal/licitacion-modal.page';


@Component({
  selector: 'app-licitaciones',
  templateUrl: './licitaciones.page.html',
  styleUrls: ['./licitaciones.page.scss'],
})
export class LicitacionesPage implements OnInit {
  licitaciones: any[] = []; // Lista de servicios

  constructor(private modalController: ModalController,
              private servicio: ServiceService,
              private navCtrl: NavController,
              private alertCtrl: AlertController) {
    this.consultarServivesUser();
   }

  ngOnInit() {
  }

  async abrirModal(licta: any) {
    const modal = await this.modalController.create({
      component: LicitacionModalPage,
      componentProps: {
        nomServicio: licta.nomServicio,
        desNecesidad: licta.des_necesidad,
        idLicita: licta.id
      }
    });
    return await modal.present();
  }
  async consultarServivesUser() {
    const dni_usuario_licita = localStorage.getItem('dni');
     if (dni_usuario_licita) {
       this.servicio.selectAllLicitaPorUser(dni_usuario_licita).subscribe(async data => {
          this.licitaciones = data;
          console.log(this.licitaciones);
       });
     }

   }

   async rechazarLicitacion(licta: any) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmación',
      message: '¿Está seguro de rechazar este trabajo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Rechazo cancelado');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            const datos = {
              dniVe: localStorage.getItem('dni') || undefined,
              idLicita: licta.id,
              visto: 1,
              responde: 0,
              aceptado: 0,
              eliminar: 1
            };
            this.servicio.inactivarJOB(datos)
              .then(
                async data => {
                  console.log(data);
                  this.consultarServivesUser();
                }
              )
              .catch(
                error => {
                  console.log(error);
                }
              );
          }
        }
      ]
    });

    await alert.present();
  }
}
