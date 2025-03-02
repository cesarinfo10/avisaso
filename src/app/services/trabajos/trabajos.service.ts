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
    const body = JSON.stringify(datos);

    return new Promise(
      resolve => {
        this.http.post(apiUrl + 'servicios/trabajos.php?addFotosTrabajos', body)
          .subscribe(
            data => {
              resolve(data);
            },
            err => {
              console.log(err);
            });
      }
    )
  }

  actualizarRotacion(datos: any) {
      const body = JSON.stringify(datos);

      return new Promise(
        resolve => {
          this.http.post(apiUrl + 'servicios/trabajos.php?EditFotosTrabajos', body)
            .subscribe(
              data => {
                resolve(data);
              },
              err => {
                console.log(err);
              });
        }
      )
  }

  // ==============================================================
  // ELIMINAR FOTOS
  // ==============================================================
  eliminarFoto(id: string) {
    return new Promise(
      resolve => {
        // tslint:disable-next-line:max-line-length
        this.http.get(apiUrl + 'servicios/trabajos.php?id=' + id + '&DeleteFotosTrabajos')
          .subscribe(
            data => {
              resolve(data);
            },
            err => {
              console.log(err);
            }
          );
      }
    );
  }

// ==============================================================
// REGISTRO DE REPORTES DE SOLUCION FOTOS
// ==============================================================
callPhotoJob(dni: string) {
  return new Promise(
    resolve => {
      this.http.get(apiUrl + 'servicios/trabajos.php?dni=' + dni + '&consultaFotosTrabajos')
        .subscribe(
          data => {
            resolve(data);
          },
          err => {
            console.log(err);
          }
        );
    }
  );
}
  // ==============================================================
  // ELIMINAR FOTOS Y TRABAJOS
  // ==============================================================
  eliminarFotoJOB(id: string) {
    return new Promise(
      resolve => {
        // tslint:disable-next-line:max-line-length
        this.http.get(apiUrl + 'servicios/trabajos.php?id=' + id + '&DeleteFotosYTrabajos')
          .subscribe(
            data => {
              resolve(data);
            },
            err => {
              console.log(err);
            }
          );
      }
    );
  }
}
