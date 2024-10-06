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
  // REGISTRO DE SERVICIOS DEL USUARIOS
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
