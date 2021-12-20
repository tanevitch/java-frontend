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
  reservasPendientes: any
  reservasCanceladas: any
  reservasSinConfirmar: any

  servicio: Servicio
  constructor(private router: Router, private reservaService: ReservaService, private servicioService: ServicioService) { }

  ngOnInit(): void {
    let id= window.location.pathname.split("/")[2];
    this.servicioService.getServicioConId(id).subscribe(res => this.servicio= res);
    this.reservaService.obtenerReservasDeServicio(id, "SINCONFIRMAR").subscribe(
      res => {
        this.reservasSinConfirmar = res
      }
    )
    this.reservaService.obtenerReservasDeServicio(id, "CANCELADA").subscribe(
      res => {
        this.reservasCanceladas = res
      }
    )
    this.reservaService.obtenerReservasDeServicio(id, "CONFIRMADA").subscribe(
      res => {
        this.reservasPendientes = res
      }
    )
  }

  confirmar(reserva: Reserva){
    this.reservaService.cambiarEstado(reserva.id, "CONFIRMADA").subscribe(() => {
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

  marcarComoFinalizada(reserva: Reserva){
    this.reservaService.cambiarEstado(reserva.id, "FINALIZADA").subscribe(() => {
      Swal.fire(
        '¡Listo!',
        'Reserva finalizada',
        'success'
      ).then(
        () =>  {
         window.location.reload();
        }
 
       )
    })
  }

  rechazar(reserva: Reserva){
    this.reservaService.cambiarEstado(reserva.id, "RECHAZADA").subscribe(() => {
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

  cancelar(reserva: Reserva){
    this.reservaService.cambiarEstado(reserva.id, "CANCELADA").subscribe(() => {
      Swal.fire(
        '¡Listo!',
        'Reserva cancelada',
        'success'
      ).then(
       () =>  {
        window.location.reload();
       }

      )
    })
  }

}
