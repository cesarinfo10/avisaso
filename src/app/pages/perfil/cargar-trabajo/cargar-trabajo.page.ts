import { Component, OnInit } from '@angular/core';
import { TrabajosService } from '../../../services/trabajos/trabajos.service';


@Component({
  selector: 'app-cargar-trabajo',
  templateUrl: './cargar-trabajo.page.html',
  styleUrls: ['./cargar-trabajo.page.scss'],
})
export class CargarTrabajoPage implements OnInit {

  nomTrabajo: string = '';
  descripcion: string = '';
  estado: string = '1'; // Valor predeterminado

  constructor(private servicio:TrabajosService) { }

  ngOnInit() {
  }

  guardarTrabajo() {
    const usuarioServ = {

      nomTrabajo: this.nomTrabajo,
        descripcion: this.descripcion,
        estado: this.estado,
        dni: localStorage.getItem('dni') || undefined
        };
/*
        this.servicio.addSerUser(usuarioServ)
        .then(
          async data => {
            console.log('Valor de data:', data); // Agrega este log para verificar el valor de data
            if (data !== 1 && data !== 3) {
              const alert = await this.alertCtrl.create({
                header: 'Registro de Servicio',
                message: 'Error al registrar el servicio',
                buttons: ['OK']
              });
              await alert.present();
              return;
            } else if (data === 3) {
              console.log('Servicio actualizado con éxito'); // Agrega este log para verificar si entra en este bloque
              const alert = await this.alertCtrl.create({
                header: 'Registro de Servicio',
                message: 'Servicio se actualizó con éxito',
                buttons: ['OK']
              });
              await alert.present();
              this.consultarServivesUser();
              this.limpiarCampos();
            } else {
              console.log('Servicio registrado con éxito'); // Agrega este log para verificar si entra en este bloque
              const alert = await this.alertCtrl.create({
                header: 'Registro de Servicio',
                message: 'Servicio registrado con éxito',
                buttons: ['OK']
              });
              await alert.present();
              this.consultarServivesUser();
              this.limpiarCampos();
            }
          }
        )*/
      }
}
