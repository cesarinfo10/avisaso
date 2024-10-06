import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { NavController, AlertController } from '@ionic/angular';
import { ServiceService } from '../../services/services/service.service';


interface Servicio {
  nomServicio: string;
}

@Component({
  selector: 'app-licitar',
  templateUrl: './licitar.page.html',
  styleUrls: ['./licitar.page.scss'],
})
export class LicitarPage implements OnInit {
  nomServicio: string = '';
  des_necesidad: string = '';
  suggestions: Servicio[] = [];
  filteredSuggestions: Servicio[] = [];

  constructor(private servicioService: UserService,
              private userService: ServiceService,
              private navCtrl: NavController,
              private alertCtrl: AlertController,) {}


  ngOnInit() {
    this.getSuggestions();
  }

  getSuggestions() {
    this.servicioService.getSuggestions().subscribe((data: Servicio[]) => {
      console.log(data);
      this.suggestions = data;
    });
  }

  filterSuggestions() {
    const term = this.nomServicio.toLowerCase();
    this.filteredSuggestions = this.suggestions.filter(suggestion =>
      suggestion.nomServicio.toLowerCase().includes(term)
    );
  }

  selectSuggestion(suggestion: Servicio) {
    this.nomServicio = suggestion.nomServicio;
    this.filteredSuggestions = [];
  }

  validarCampos(): boolean {
    if (this.nomServicio === '') {
      this.presentAlert('Error', 'Ingrese nombres');
      return false;
    }
    if (this.des_necesidad === '') {
      this.presentAlert('Error', 'Ingrese apellidos');
      return false;
    }
    this.guardarServicio();
    return true;
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

 async guardarServicio() {
      const datos = {
        dni_usuario_licita: localStorage.getItem('dni') || undefined,
        nombre_usuario_licita: localStorage.getItem('nombre') || undefined,
        cel_usuario_licita: localStorage.getItem('celular') || undefined,
        nomServicio: this.nomServicio,
        des_necesidad: this.des_necesidad,
      };
    this.userService.newServices(datos)
      .then(
        async data => {
          if (data === 2) {
            const alert = await this.alertCtrl.create({
              header: 'Error',
              message: 'Error al registrar el servicio',
              buttons: ['OK']
            });
            await alert.present();
            return;
          }else{
          const alert = await this.alertCtrl.create({
            header: 'Registro exitoso',
            message: 'Servicio registrado con éxito',
            buttons: ['OK']
          });
          await alert.present();
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

  limpiarRegistro(){
    this.nomServicio = '';
    this.des_necesidad = '';
  }
}
