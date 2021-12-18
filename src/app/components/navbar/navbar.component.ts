import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', '../../app.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {

  }

  successLogout(){
    Swal.fire({
      width: 300,
      heightAuto: true,
      position: 'top-end',
      text: 'Has cerrado sesión',
      showConfirmButton: false,
      timer: 1500
    })
  }

  logout(): void {
    Swal.fire({
      title: 'Estás por cerrar sesión',
      text: "¿Continuar?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Cerrar sesión'
    }).then((result) => {
      if (result.isConfirmed) {
        this.successLogout()
        this.authService.logout()
      }
    })  }
}
