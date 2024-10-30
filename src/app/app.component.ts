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
  public appPages = [
    { title: 'Home', url: 'home', icon: 'home' },
    { title: 'Usuario', url: 'usuario', icon: 'person' },
    { title: 'Servicios', url: 'servicios', icon: 'briefcase', visible: true },
    { title: 'Busqueda', url: 'busqueda', icon: 'search' },
    { title: 'Licitaiones', url: 'licitaciones', icon: 'document', visible: true },
    { title: 'Mis Licitaciones', url: 'mis-licitaciones', icon: 'archive' },
    { title: 'Mi Perfil', url: 'perfil', icon: 'people' },

  ];

  public userType: number = localStorage.getItem('tipo') ? parseInt(localStorage.getItem('tipo')!) : 1;
  constructor(private router: Router, private navCtrl: NavController,) {
    this.setMenuVisibility();
  }

  setMenuVisibility() {
    if (this.userType !== 3) {
      this.appPages = this.appPages.map(page => {
        if (page.title === 'Servicios' || page.title === 'Licitar') {
          return { ...page, visible: false };
        }
        return page;
      });
    }
  }
  logout() {
    localStorage.clear(); // Elimina todos los datos del localStorage
    this.navCtrl.navigateRoot('/login');
  }
}
