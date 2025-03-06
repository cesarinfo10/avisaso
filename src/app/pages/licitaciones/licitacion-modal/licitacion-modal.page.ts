import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-licitacion-modal',
  templateUrl: './licitacion-modal.page.html',
  styleUrls: ['./licitacion-modal.page.scss'],
})
export class LicitacionModalPage implements OnInit {

  @Input() nomServicio: string | undefined;
  @Input() desNecesidad: string | undefined;
  @Input() idLicita: string | undefined;

  respuesta: string = '';

 constructor(private modalController: ModalController) {}

 cerrarModal() {
  this.modalController.dismiss();
}
  ngOnInit() {
  }

  responder() {
    // Lógica para responder a la necesidad
    console.log('Respuesta:', this.respuesta);
    this.cerrarModal();
  }
}
