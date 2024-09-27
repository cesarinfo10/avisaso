import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UsuarioDto } from '../../interface/usuario.dto';
import { Servicio } from '../../interface/servicio.interface'; // Adjust the import path as necessary


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
        this.http.post(apiUrl + 'servicios/usuarios.php?upadateUser', body)
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
  // LLAMAR UN SUSARIO
  // ==============================================================
  selectOneUserPos(dni: string): Observable<any> {
    return this.http.get(`${apiUrl}servicios/usuarios.php?dni=${dni}&consultaUser`);
  }

  // ==============================================================
  // AGREGAR SERVICIOS DEL USUARIO
  // ==============================================================
  addSerUser(datos: { nomServicio: string; descripcion: string; estado: string; dni: string | undefined }): Promise<any>{
    const body = JSON.stringify(datos);
    return new Promise(
      resolve => {
        this.http.post(apiUrl + 'servicios/usuarios.php?newUserProf', body)
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
  // LLAMAR SERVICIOS DEL USUARIO
  // ==============================================================
  selectAllServiceUser(dni: string): Observable<any> {
    return this.http.get(`${apiUrl}servicios/usuarios.php?dni=${dni}&consultaUserSer`);
  }
   // ==============================================================
  // LLAMAR SERVICIOS DEL USUARIO
  // ==============================================================
  selectAllServiceUserOne(idService: string): Observable<any> {
    return this.http.get(`${apiUrl}servicios/usuarios.php?idService=${idService}&consultaUserSerOne`);
  }

  // ==============================================================
  // LLAMAR BUSQUEDA SERVICIOS DEL USUARIO
  // ==============================================================
  busquedaServiceUserOne(nomServicio: string): Observable<any> {
    return this.http.get(`${apiUrl}servicios/usuarios.php?nomServicio=${nomServicio}&busquedaUserSerOne`);
  }

  // ==============================================================
  // LLAMAR SERVICIOS
  // ==============================================================
  getSuggestions(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${apiUrl}servicios/usuarios.php?busquedaUserSer`);
  }
}
