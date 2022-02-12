import { ServicioService } from 'src/app/services/servicio.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Reserva } from 'src/app/models/reserva/reserva';
import { Servicio } from 'src/app/models/servicio/servicio';
import { ReservaService } from 'src/app/services/reserva.service';
import { TipoServicioService } from 'src/app/services/tiposervicio.service';
import Swal from 'sweetalert2';
import { Puntuacion } from 'src/app/models/puntuacion/puntuacion';
import { AuthService } from 'src/app/services/auth.service';
import { PuntuacionService } from 'src/app/services/puntuacion.service';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['../../../app.component.css', './mis-reservas.component.css'],

})
export class MisReservasComponent implements OnInit {
  reservas: any
  @ViewChild('botonPuntuar') botonPuntuar: ElementRef;
  aspectosPuntuacion: any
  servicioAPuntuar: Servicio

  map: Map<number,number> = new Map<number,number>();
  selectedValue: number;

  reservaActual: any;

  constructor(private puntuacionService: PuntuacionService, private reservaService: ReservaService, private tipoServicioService: TipoServicioService, private authService: AuthService) { }

  ngOnInit(): void {
    this.reservaService.obtenerReservas().subscribe(res => {
      res.forEach((reserva: any) => {
        let fechaHora= reserva.fechaHora.toLocaleString("es-AR").split("T")
        reserva.fecha = fechaHora[0]
        reserva.hora = fechaHora[1]
        this.puntuacionService.puntuada(reserva).subscribe((res: any) => {
          reserva.puntuada= res
        })
      });
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
     this.tipoServicioService.getAspectosAPuntuar(servicio.tipoServicio.id).subscribe(res => {
       this.aspectosPuntuacion= res
       this.aspectosPuntuacion.forEach( (a:any) => this.map.set(a.id, 5))
      })
  }

  countStar(star: number, aspecto: number) {
    this.map.set(aspecto,star)
  };

  puntuarActual(reserva: any){
    this.obtenerAspectos(reserva.servicio)
    this.reservaActual = reserva
    
  }

  save(){
    
    var puntuaciones: Puntuacion[] = []
    this.map.forEach(
      (value, key) => {
        puntuaciones.push(new Puntuacion(key, value, {id: this.reservaActual.usuario.id}, {id: this.reservaActual.evento.id}))
      }
    )
    this.puntuacionService.puntuarServicio(this.servicioAPuntuar, puntuaciones).subscribe(() =>{
       this.reservas.find( (r: any) => r.id == this.reservaActual.id).puntuada = true
       Swal.fire(
        '¡Listo!',
        'Servicio puntuado',
        'success')
    })
    
  }
}
function res(res: any, arg1: (any: any) => any) {
  throw new Error('Function not implemented.');
}

