import { Component, OnInit } from '@angular/core';
import { Reserva } from 'src/app/models/reserva/reserva';
import { Servicio } from 'src/app/models/servicio/servicio';
import { ReservaService } from 'src/app/services/reserva.service';
import { TipoServicioService } from 'src/app/services/tiposervicio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['../../../app.component.css'],
})
export class MisReservasComponent implements OnInit {
  reservas: any
  aspectosPuntuacion: any
  servicioAPuntuar: Servicio
  constructor(private reservaService: ReservaService, private tipoServicioService: TipoServicioService) { }

  ngOnInit(): void {
    this.reservaService.obtenerReservas().subscribe(res => {
      res.forEach((reserva: any) => {
        let fechaHora= reserva.fechaHora.toLocaleString("es-AR").split("T")
        reserva.fecha = fechaHora[0]
        reserva.hora = fechaHora[1]
      });
      console.log(res)
      this.reservas= res
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

  obtenerAspectos(servicio: any){
     this.servicioAPuntuar = servicio
     this.tipoServicioService.getAspectosAPuntuar(servicio.tipoServicio.id).subscribe(res => this.aspectosPuntuacion= res)
  }

}
