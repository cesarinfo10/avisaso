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
  // ==============================================================
  // REGISTRO DE LICITACIONES HECHAS
  // ==============================================================
  selectAllLicitaUser(dni: string): Observable<any> {
    return this.http.get(apiUrl + `servicios/servicios.php?dni_usuario_licita=${dni}&todosServicios`);
  }
    // ==============================================================
  // REGISTRO DE LICITACIONES HECHAS POR USUARIO
  // ==============================================================
  selectAllLicitaPorUser(dni: string): Observable<any> {
    return this.http.get(apiUrl + `servicios/servicios.php?dni=${dni}&todosServiciosPorNom`);
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

  // ==============================================================
  // LLAMAR SERVICIOS POR USUARIO
  // ==============================================================
  selectOnelicitacionUser(id: string): Observable<any> {
    return this.http.get(`${apiUrl}servicios/servicios.php?id=${id}&detalleLicitacionesUser`);
  }
  // ==============================================================
  // AGREGAR ESTADO Y VISTO DE LA LICITACIÓN
  // ==============================================================
  estadosJOB (datos: any) {
    const body = JSON.stringify(datos);
    return new Promise(
      resolve => {
        this.http.post(apiUrl + 'servicios/servicios.php?estadosServicio', body)
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
  // AGREGAR RESPUESTA DEL USUARIO QUE LICITO
  // ==============================================================
  respuestaJOB (datos: any) {
    const body = JSON.stringify(datos);
    return new Promise(
      resolve => {
        this.http.post(apiUrl + 'servicios/servicios.php?respuestaJOB', body)
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
