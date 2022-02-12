import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reserva } from '../models/reserva/reserva';
import { Servicio } from '../models/servicio/servicio';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PuntuacionService {
  endpoint: string = 'api/puntuacion'
  constructor(private router: Router, private http: HttpClient, private authService: AuthService) { }

  public puntuarServicio(servicio: Servicio, aspectoYPuntuacion: any): Observable<any>{
    let url = environment.apiJava + this.endpoint +"/" + servicio.id
    return this.http.post(url, aspectoYPuntuacion)
  }

  public promedioServicio(idServicio: number): Observable<any>{
    let url = environment.apiJava + this.endpoint +"/promedio/" + idServicio
    return this.http.get(url)
  }

  public puntuada(reserva: Reserva){
    let url = environment.apiJava + this.endpoint +"/" + reserva.id
    return this.http.get(url)
  }

  public obtenerPuntuaciones(idServicio: any){
    let url = environment.apiJava + this.endpoint +"/servicio/" + idServicio
    return this.http.get(url)
  }
}
