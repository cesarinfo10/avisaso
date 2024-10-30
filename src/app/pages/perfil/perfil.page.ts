import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { UserService } from '../../services/user/user.service';
import { environment } from '../../../environments/environment';

const apiUrl = environment.apiUrl;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);

  public image: string= apiUrl+'/assets/perfil.png';
  public usuario: string = 'Sin usuario';
  public nombres: string = '';
  public apellidos: string = '';
  public descripcion: string = '';


  users: any[] = [];

  constructor(private menu: MenuController, private userService: UserService, private router: Router) {}
  ionViewWillEnter() {
    this.menu.enable(true);
    this.consultarUser();
  }
  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  async consultarUser() {

   const dni = localStorage.getItem('dni');
    if (dni) {
      this.userService.selectOneUserPos(dni).subscribe(async data => {
       // console.log(data["dni"]);
        this.users = [data];
        this.usuario = data["usuario"];
        this.nombres = data["nombres"];
        this.apellidos = data["apellidos"];
        this.descripcion = data["carta_presentacion"];
        this.image = data["foto_perfil"];
       // console.log(this.users);
      });
    }
  }
  irABusqueda() {
    this.router.navigate(['/busqueda']);
    }
}
