import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: 'home', icon: 'home' },
    /*{ title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/archived', icon: 'archive' },*/
    { title: 'Usuario', url: 'usuario', icon: 'person' },
    { title: 'Servicios', url: 'servicios', icon: 'briefcase' },

  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(private router: Router, private navCtrl: NavController,) {}

  logout() {
    localStorage.clear(); // Elimina todos los datos del localStorage
    this.navCtrl.navigateRoot('/login');
  }
}
