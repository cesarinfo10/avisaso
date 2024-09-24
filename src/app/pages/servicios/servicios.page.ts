import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { AlertController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage implements OnInit {

  nomServicio: string = '';
  descripcion: string = '';
  estado: string = '1'; // Valor predeterminado
  servicios: any[] = []; // Lista de servicios
  id: string = '0';

  constructor(private servicio: UserService,
              private navCtrl: NavController,
              private alertCtrl: AlertController,
              private route: ActivatedRoute,
              private router: Router) {
                this.consultarServivesUser();
               }

  ngOnInit() {
  }
  guardarServicio() {
    const usuarioServ = {
        id: this.id,
        nomServicio: this.nomServicio,
        descripcion: this.descripcion,
        estado: this.estado,
        dni: localStorage.getItem('dni') || undefined
        };

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
        )
        .catch(
          error => {
            console.log(error + ' no se pudo insertar datos');
          }
        );
      }
  limpiarCampos() {
    this.nomServicio = '';
    this.descripcion = '';
    this.estado = '';
    this.id = '0';
    //this.navCtrl.navigateRoot('/home');
  }

  async consultarServivesUser() {
    const dni = localStorage.getItem('dni');
     if (dni) {
       this.servicio.selectAllServiceUser(dni).subscribe(async data => {
          console.log(data);
          this.servicios = data;
       });
     }
   }

   async callOneService(idService: string) {
       if (idService) {
         this.servicio.selectAllServiceUserOne(idService).subscribe(async data => {
          console.log(data[0]["nomServicio"]);
         this.nomServicio = data[0]["nomServicio"] || '';
         this.descripcion = data[0]["descripcion"] || '';
         this.estado = data[0]["estado"] || '';
         this.id = data[0]["id"] || '';
         });
       }
    }
  }
