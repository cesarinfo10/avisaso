import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { UserService } from '../services/user/user.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  users: any[] = [];

  usuario = {
    nombres: '',
    apellidos: '',
    dni: '',
    password: '',
    rep_password: ''
  };

  constructor(
    private userService: UserService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private menu: MenuController
  ) {}

  // Deshabilita el menú cuando la vista está a punto de entrar
  ionViewWillEnter() {
    this.menu.enable(false);
  }
  ngOnInit() {}

  validarCampos(): boolean {
    if (this.usuario.nombres === '') {
      this.presentAlert('Error', 'Ingrese nombres');
      return false;
    }
    if (this.usuario.apellidos === '') {
      this.presentAlert('Error', 'Ingrese apellidos');
      return false;
    }
    if (this.usuario.dni === '') {
      this.presentAlert('Error', 'Ingrese DNI');
      return false;
    }
    if (this.usuario.password === '') {
      this.presentAlert('Error', 'Ingrese contraseña');
      return false;
    }
    if (this.usuario.rep_password === '') {
      this.presentAlert('Error', 'Repita contraseña');
      return false;
    }
    if (this.usuario.password !== this.usuario.rep_password) {
      this.presentAlert('Error', 'Las contraseñas no coinciden');
      return false;
    }
    this.crearUsuario();
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

  async crearUsuario(){
      const datos = {
        nombres: this.usuario.nombres,
        apellidos: this.usuario.apellidos,
        dni: this.usuario.dni,
        password: this.usuario.password,
        rep_password: this.usuario.rep_password,
      };
    this.userService.newUser(datos)
      .then(
        async data => {
          if (data === 2) {
            const alert = await this.alertCtrl.create({
              header: 'Error',
              message: 'Error al registrar usuario',
              buttons: ['OK']
            });
            await alert.present();
            return;
          }else{
          const alert = await this.alertCtrl.create({
            header: 'Registro exitoso',
            message: 'Usuario registrado con éxito',
            buttons: ['OK']
          });
          await alert.present();
          this.limpiarRegistro();
          this.irLogin();
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
  this.usuario.nombres = '';
  this.usuario.apellidos = '';
  this.usuario.dni = '';
  this.usuario.password = '';
  this.usuario.rep_password = '';
}

  irLogin(){
    this.navCtrl.navigateForward('/login');
  }
}
