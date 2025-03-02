import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { UserService } from '../../services/user/user.service';
import { TrabajosService } from '../../services/trabajos/trabajos.service';
import { environment } from '../../../environments/environment';
import { register } from 'swiper/element/bundle';
import { AlertController } from '@ionic/angular';

AlertController

register();

const apiUrl = environment.apiUrl;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);

  public image: string = apiUrl + '/assets/perfil.png';
  public usuario: string = 'Sin usuario';
  public nombres: string = '';
  public apellidos: string = '';
  public descripcion: string = '';
  public cel: string = '';

  users: any[] = [];
  fotos: any[] = []; // Variable para almacenar las fotos
  trabajos: any[] = []; // Variable para almacenar los trabajos

  public tipoUsuario: number = localStorage.getItem('tipo') ? parseInt(localStorage.getItem('tipo')!) : 1;

  constructor(
    private menu: MenuController,
    private userService: UserService,
    private servicioJob: TrabajosService,
    private router: Router,
    private alertCtrl: AlertController,
  ) { }

  ionViewWillEnter() {
    this.menu.enable(true);
    this.consultarUser();
    this.consultarJobUser();
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  async consultarUser() {
    let dni = this.activatedRoute.snapshot.paramMap.get('dni');
    if (!dni) {
      dni = localStorage.getItem('dni');
    }
    if (dni) {
      this.userService.selectOneUserPos(dni).subscribe(async data => {
        this.users = [data];
        this.usuario = data["usuario"];
        this.nombres = data["nombres"];
        this.apellidos = data["apellidos"];
        this.descripcion = data["carta_presentacion"];
        this.image = data["foto_perfil"];
        this.cel = data["celular"];
      });
    }
  }

  // =============================================================
  // LLAMAR TRABAJOS CON FOTOS
  // =============================================================
  async consultarJobUser() {
    let dni = this.activatedRoute.snapshot.paramMap.get('dni');
    if (!dni) {
      dni = localStorage.getItem('dni');
    }
    if (dni) {
      this.servicioJob.callPhotoJob(dni)
        .then((data: any) => {
          this.fotos = Array.isArray(data['fotos']) ? data['fotos'] : [];
          this.trabajos = Array.isArray(data['trabajos']) ? data['trabajos'] : [];
        })
        .catch(error => {
          console.error('Error al obtener trabajos con fotos:', error);
        });
    }
  }
  // =============================================================
  //  ELIMINAR  TRABAJOS CON FOTOS
  // =============================================================
  mensajeEliminar(trabajoId: number) {
    this.alertCtrl.create({
      header: 'Eliminar trabajo',
      message: '¿Estás seguro de que deseas eliminar este trabajo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.eliminarTrabajo(trabajoId);
          }
        }
      ]
    }).then(alert => {
      alert.present();
    });
  }
  eliminarTrabajo(trabajoId: number) {
      this.servicioJob.eliminarFotoJOB(trabajoId.toString())
        .then(
          async data => {
            this.consultarJobUser()
          }
        )
        .catch(
          error => {
            console.log(error + 'no se pudo eliminar la foto');
          }
        );
    // Lógica para eliminar el trabajo
    console.log(`Eliminar trabajo con ID: ${trabajoId}`);
    // Aquí puedes llamar a un servicio para eliminar el trabajo
  }

  getFotosByTrabajo(trabajoId: number) {
    return this.fotos.filter(foto => foto.id_trabajo === trabajoId);
  }

  goAddJob() {
    this.router.navigate(['/cargar-trabajo']);
  }

    // Nueva función para generar el enlace de WhatsApp
    getWhatsAppLink(): string {
      const message = `Hola ${this.nombres}, Te encontré en AVISASO y quisiera más información de tus servicios.`;
      return `https://wa.me/${this.cel}?text=${encodeURIComponent(message)}`;
    }
}
