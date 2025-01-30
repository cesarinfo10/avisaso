import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class TrabajosService {

  constructor(private http: HttpClient) { }

  // ==============================================================
  // REGISTRO DE LICITACIONES DEL USUARIOS
  // ==============================================================
  newJob(datos: any) {
    const body = JSON.stringify(datos);
    return new Promise(
      resolve => {
        this.http.post(apiUrl + 'servicios/trabajos.php?addTrabajos', body)
          .subscribe(
            data => {
              resolve(data);
            },
            err => {
              console.log(err);
            });
      }
    );
  }

  // ==============================================================
  // REGISTRO DE LICITACIONES DEL USUARIOS
  // ==============================================================
  subirAlbum(datos: any) {
    console.log('Datos recibidos:', datos);
    /*const body = JSON.stringify(datos);
    return new Promise(
      resolve => {
        this.http.post(apiUrl + 'servicios/trabajos.php?addTrabajos', body)
          .subscribe(
            data => {
              resolve(data);
            },
            err => {
              console.log(err);
            });
      }
    );*/
  }
}
