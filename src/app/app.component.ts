import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

interface AppPage {
  title: string;
  url: string;
  icon: string;
  visible?: boolean; // Propiedad opcional
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  tipoUsuario: number | null = null;
  public appPages = [
    { title: 'Home', url: 'home', icon: 'home' },
    { title: 'Usuario', url: 'usuario', icon: 'person' },
    { title: 'Servicios', url: 'servicios', icon: 'briefcase', visible: true },
    { title: 'Busqueda', url: 'busqueda', icon: 'search' },
    { title: 'Licitar', url: 'licitar', icon: 'document', visible: true },
    { title: 'Licitaiones', url: 'licitaciones', icon: 'document', visible: true },
    { title: 'Mis Licitaciones', url: 'mis-licitaciones', icon: 'archive' },
    { title: 'Mi Perfil', url: 'perfil', icon: 'people' },

  ];

  public userType: number = localStorage.getItem('tipo') ? parseInt(localStorage.getItem('tipo')!) : 1;
  constructor(private router: Router, private navCtrl: NavController,) {
    this.setMenuVisibility();
  }

  setMenuVisibility() {
    const tipoUsuario = localStorage.getItem('tipo');
    if (tipoUsuario) {
      this.tipoUsuario = parseInt(tipoUsuario, 10);
    }

    this.appPages = this.appPages.map(page => {
      if (this.tipoUsuario === null || this.tipoUsuario === undefined) {
        return { ...page, visible: page.title === 'Home' || page.title === 'Usuario' };
      } else if (this.tipoUsuario === 1 || this.tipoUsuario === 3) {
        return { ...page, visible: true };
      } else if (this.tipoUsuario === 2) {
        return { ...page, visible: page.title !== 'Servicios' && page.title !== 'Mi Perfil' };
      } else if (page.title === 'Home' || page.title === 'Usuario') {
        return { ...page, visible: true };
      }
      return { ...page, visible: false };
    });
  }



  logout() {
    localStorage.clear(); // Elimina todos los datos del localStorage
    this.navCtrl.navigateRoot('/login');
  }
}
