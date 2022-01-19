import { ServicioService } from 'src/app/services/servicio.service';
import { Component, OnInit } from '@angular/core';
import { Reserva } from 'src/app/models/reserva/reserva';
import { Servicio } from 'src/app/models/servicio/servicio';
import { ReservaService } from 'src/app/services/reserva.service';
import { TipoServicioService } from 'src/app/services/tiposervicio.service';
import Swal from 'sweetalert2';
import { Puntuacion } from 'src/app/models/puntuacion/puntuacion';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['../../../app.component.css', './mis-reservas.component.css'],

})
export class MisReservasComponent implements OnInit {
  reservas: any
  aspectosPuntuacion: any
  servicioAPuntuar: Servicio

  map: Map<number,number> = new Map<number,number>();
  selectedValue: number;

  constructor(private servicioService: ServicioService, private reservaService: ReservaService, private tipoServicioService: TipoServicioService) { }

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

  countStar(star: number, aspecto: number) {


    this.map.set(aspecto,star)

  };


  save(){
    var puntuaciones: Puntuacion[] = []
    this.map.forEach((value, key) => {
      puntuaciones.push(new Puntuacion(key, value))
    })
    console.log(JSON.stringify(puntuaciones))
    this.servicioService.puntuar(this.servicioAPuntuar, puntuaciones).subscribe(() =>{})

  }
}
