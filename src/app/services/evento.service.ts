import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Evento } from '../models/evento';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  endpoint: string = 'api/eventos'
  constructor(private http: HttpClient, private authService: AuthService) { }

  public getEventos(): Observable<Array<Evento>>{
    let url = environment.apiJava + this.endpoint + "/usuario/" + this.authService.obtenerIdUsuario();
    return this.http.get<Array<Evento>>(url);
  }
  
}
