import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reserva } from 'src/app/models/reserva/reserva';
import { Servicio } from 'src/app/models/servicio/servicio';
import { ReservaService } from 'src/app/services/reserva.service';
import { ServicioService } from 'src/app/services/servicio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-reservas',
  templateUrl: './gestion-reservas.component.html',
  styleUrls: ['../../../app.component.css'],
})
export class GestionReservasComponent implements OnInit {
  reservas: any
  servicio: Servicio
  constructor(private router: Router, private reservaService: ReservaService, private servicioService: ServicioService) { }

  ngOnInit(): void {
    let id= window.location.pathname.split("/")[2];
    this.servicioService.getServicioConId(id).subscribe(res => this.servicio= res);
    this.reservaService.obtenerReservasDeServicio(id).subscribe(
      res => {
        this.reservas = res
      }
    )
  }

  confirmar(reserva: Reserva){
    this.reservaService.confirmarReserva(reserva.id).subscribe(() => {
      Swal.fire(
        '¡Listo!',
        'Reserva confirmada',
        'success'
      ).then(
        () =>  {
         window.location.reload();
        }
 
       )
    })
  }

  rechazar(reserva: Reserva){
    this.reservaService.rechazarReserva(reserva.id).subscribe(() => {
      Swal.fire(
        '¡Listo!',
        'Reserva rechazada',
        'success'
      ).then(
       () =>  {
        window.location.reload();
       }

      )
    })
  }

}
