import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  selectAllLicitaUser(dni: string): Observable<any> {
    return this.http.get(apiUrl + `servicios/servicios.php?dni_usuario_licita=${dni}&todosServicios`);
  }
  // ==============================================================
  // REGISTRO DE LICITACIONES DEL USUARIOS
  // ==============================================================
  newServices(datos: any) {
    const body = JSON.stringify(datos);
    return new Promise(
      resolve => {
        this.http.post(apiUrl + 'servicios/servicios.php?addServicio', body)
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
}
