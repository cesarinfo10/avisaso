import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { UserService } from '../services/user/user.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  users: any[] = [];

  usuario = {
    dni: '',
    contrasena: ''
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
  ngOnInit() {
    const dni = localStorage.getItem('dni');
    if (dni) {
      this.navCtrl.navigateRoot('/home');
    }
   }

  camposEstanVacios(dni: string, password: string): boolean {
    return !dni || !password;
  }

  async mostrarAlertaCamposVacios(dni: string, password: string) {
    let mensaje = 'Por favor, ingrese su ';
    if (!dni && !password) {
      mensaje += 'DNI y contraseña.';
    } else if (!dni) {
      mensaje += 'DNI.';
    } else if (!password) {
      mensaje += 'contraseña.';
    }

    const alert = await this.alertCtrl.create({
      header: 'Campos Requeridos',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  async iniciarSesion(dni: string, password: string) {

    if (!dni || !password) {
      console.log('Los campos DNI y contraseña son requeridos.');
      this.mostrarAlertaCamposVacios(dni, password);
      return; // Detiene la ejecución de la función si algún campo está vacío
    }

    this.userService.selectOneUser(dni, password).subscribe(async data => {
     //console.log('Data:', data['apellidos']);
      this.users = [data]; // Ajusta según la estructura de tu objeto de respuesta
      // Ahora llama a la función async separada
      await this.verificarUsuario(data);
    });
  }

  async verificarUsuario(data: any) {
    // Ajusta esta lógica según la estructura de tu objeto de respuesta y tus necesidades
    if (data && Object.keys(data).length > 0) {
    try {
      if (data['dni'] === this.usuario.dni && data['password'] === this.usuario.contrasena) {
       // console.log(data);
        localStorage.setItem('dni', this.usuario.dni);
        localStorage.setItem('tipo', data['tipo_usuario']);
        localStorage.setItem('nombre', data['nombres']);
        localStorage.setItem('apellido', data['apellidos']);
        localStorage.setItem('celular', data['celular']);

        this.menu.enable(true);

        this.navCtrl.navigateRoot('/home');
      } else {
        return;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  } else {
    const alert = await this.alertCtrl.create({
      header: 'Error de inicio de sesión',
      message: 'El DNI o la contraseña son incorrectos.',
      buttons: ['OK']
    });
    await alert.present();
  }
  }

  irRegistro() {
    this.navCtrl.navigateRoot('/registro');
  }
}
