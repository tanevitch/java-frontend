import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoeventoService {
  endpoint: string = 'api/tipo_eventos'
  constructor(private http: HttpClient) { }

  public getTipoEventos(): Observable<Array<any>>{
    let url = environment.apiJava + this.endpoint;
    return this.http.get<Array<any>>(url);
  }
}
