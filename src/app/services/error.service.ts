import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from './auth.service';
import Swal from 'sweetalert2';


@Injectable()
export class ErrorService implements HttpInterceptor {
    constructor(private authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 403 || err.status == 0) {
                err.error= "Token inválido"
                this.authenticationService.logout();
                location.reload();
            }
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.error,
            })
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}