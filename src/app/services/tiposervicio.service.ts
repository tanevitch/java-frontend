import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tiposervicio } from '../models/tiposervicio/tiposervicio';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TipoServicioService {
  endpoint: string = 'api/categorias_servicios'
  
  constructor(private http: HttpClient, private authService: AuthService) { }
  
  public getCategorias(): Observable<Array<Tiposervicio>>{
    let url = environment.apiJava + this.endpoint;
    return this.http.get<Array<Tiposervicio>>(url, {
      headers: {
        Authorization: `Bearer ${this.authService.obtenerToken()}`
      }
    });
  }
}
