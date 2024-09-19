import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UsuarioDto } from '../../interface/usuario.dto';


const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class UserService {


  constructor(private http: HttpClient) { }

  // Método para obtener usuarios
  getUsers(): Observable<any> {
    return this.http.get(`${apiUrl}/api/v1/usuario`);
  }

  selectOneUser(dni: string, password: string): Observable<any> {
  return this.http.get(`${apiUrl}servicios/usuarios.php?dni=${dni}&pass=${password}&session`);
}
  // ==============================================================
  // REGISTRO DE USUARIOS
  // ==============================================================
  addUser(datos: UsuarioDto) {
    const body = JSON.stringify(datos);
    return new Promise(
      resolve => {
        this.http.post(apiUrl + 'servicios/usuarios.php?newUser', body)
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
