import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuario } from '../models/usuario/usuario';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  endpoint: string = 'api/usuarios'
  constructor(private http: HttpClient, private authService: AuthService) { }

  public registrar(data: string): Observable<Usuario>{
    let url = environment.apiJava + "registrarse";
    return this.http.post<Usuario>(url, data);
  }

  public getDatos(): Observable<Usuario>{
    let url = environment.apiJava + this.endpoint + "/" + this.authService.obtenerIdUsuario();
    return this.http.get<Usuario>(url);
  }

  public editarDatos(data: any): Observable<Usuario>{
    let url = environment.apiJava + this.endpoint + "/" + this.authService.obtenerIdUsuario();
    return this.http.put<Usuario>(url, data);
  }
}