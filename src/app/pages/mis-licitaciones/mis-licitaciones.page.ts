import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/services/service.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-mis-licitaciones',
  templateUrl: './mis-licitaciones.page.html',
  styleUrls: ['./mis-licitaciones.page.scss'],
})
export class MisLicitacionesPage implements OnInit {
  licitaciones: any[] = []; // Lista de servicios

  constructor(private servicio: ServiceService, private navCtrl: NavController,) {
    this.consultarServivesUser();
   }

  ngOnInit() {
  }

  async consultarServivesUser() {
    const dni_usuario_licita = localStorage.getItem('dni');
     if (dni_usuario_licita) {
       this.servicio.selectAllLicitaUser(dni_usuario_licita).subscribe(async data => {
          console.log(data);
          this.licitaciones = data;
       });
     }
   }

   irVerLicitacion() {
    this.navCtrl.navigateRoot('/ver-mi-licitacion');
  }
}
