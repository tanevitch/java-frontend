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
export class ReservaService {
  

  endpoint: string = 'api/reservas'
  constructor(private router: Router, private http: HttpClient, private authService: AuthService) { }

  public reservarServicio(servicio: Servicio){
    this.router.navigate([`reservarServicio/${servicio.id}`])
  }

  public confirmarReserva(id: number) {
    let url = environment.apiJava + this.endpoint + "/confirmar/" +id
    return this.http.post(url, null)
  }

  public rechazarReserva(id: number) {
    let url = environment.apiJava + this.endpoint + "/rechazar/" +id
    return this.http.post(url, null)
  }

  public nuevaReserva(reserva: Reserva): Observable<any>{
    let url = environment.apiJava + this.endpoint 
    return this.http.post(url, reserva)
  }

  public obtenerReservas(): Observable<any>{
    let url = environment.apiJava + this.endpoint + "/usuario/" + this.authService.obtenerIdUsuario()
    return this.http.get(url)
  }

  public obtenerReservasDeServicio(id_servicio: any): Observable<any>{
    let url = environment.apiJava + this.endpoint + "/servicio/" + id_servicio
    return this.http.get(url)
  }
}
