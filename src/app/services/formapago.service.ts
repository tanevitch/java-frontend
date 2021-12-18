import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Servicio } from '../models/servicio/servicio';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FormapagoService {
  endpoint: string = 'api/formas_pago'
  constructor(private http: HttpClient, private authService: AuthService) { }

  public getFormasDePago(): Observable<Array<Servicio>>{
    let url = environment.apiJava + this.endpoint;
    return this.http.get<Array<Servicio>>(url);
  }
}
