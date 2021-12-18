import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Servicio } from '../models/servicio/servicio';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  endpoint: string = 'api/eventos'
  constructor(private http: HttpClient, private authService: AuthService) { }

  public getEventos(): Observable<Array<Servicio>>{
    let url = environment.apiJava + this.endpoint + "/usuario/" + this.authService.obtenerIdUsuario();
    return this.http.get<Array<Servicio>>(url);
  }
}
