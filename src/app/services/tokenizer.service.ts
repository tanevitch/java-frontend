import { HttpClient, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenizerService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log(`TokenInterceptor - ${req.url}`);
    let authReq: HttpRequest<any> = req.clone({
    setHeaders:{
    Authorization : `Bearer ${this.authService.obtenerToken()}`
    }
    });
    return next.handle(authReq);
    }
   
}
