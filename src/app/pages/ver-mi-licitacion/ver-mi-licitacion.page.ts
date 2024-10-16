import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../services/services/service.service';

@Component({
  selector: 'app-ver-mi-licitacion',
  templateUrl: './ver-mi-licitacion.page.html',
  styleUrls: ['./ver-mi-licitacion.page.scss'],
})
export class VerMiLicitacionPage implements OnInit {

  id: string = '';

  nomServicio: string = '';
  des_necesidad: string = '';

  messages = [
    { text: 'Hola, ¿cómo estás?', isMine: true },
    { text: 'Estoy bien, gracias. ¿Y Vos?', isMine: false },
  ];

  constructor(private servicio: ServiceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    console.log('ID de la licitación:', this.id);
    this.consultarServivesUser(this.id);

  }
  async consultarServivesUser(id: string) {

       this.servicio.selectOnelicitacionUser(id).subscribe(async data => {
          console.log(data['nomServicio']);
         this.nomServicio = data['nomServicio'];
         this.des_necesidad = data['des_necesidad'];
       });
   }
}
