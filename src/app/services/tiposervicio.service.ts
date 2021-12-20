import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tiposervicio } from '../models/tiposervicio/tiposervicio';

@Injectable({
  providedIn: 'root'
})
export class TipoServicioService {
  endpoint: string = 'api/categorias_servicios'
  
  constructor(private http: HttpClient) { }
  
  public getCategorias(): Observable<Array<Tiposervicio>>{
    let url = environment.apiJava + this.endpoint;
    return this.http.get<Array<Tiposervicio>>(url);
  }

  public getAspectosAPuntuar(ts: any): Observable<Array<String>>{
    let url = environment.apiJava + this.endpoint + "/"+ ts + "/aspectos_puntuacion" ;
    console.log(url)
    return this.http.get<Array<String>>(url);
  }
}
