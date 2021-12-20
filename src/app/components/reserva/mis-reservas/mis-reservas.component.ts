import { Component, OnInit } from '@angular/core';
import { Servicio } from 'src/app/models/servicio/servicio';
import { ReservaService } from 'src/app/services/reserva.service';
import { TipoServicioService } from 'src/app/services/tiposervicio.service';

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

  obtenerAspectos(servicio: any){
     this.servicioAPuntuar = servicio
     this.tipoServicioService.getAspectosAPuntuar(servicio.tipoServicio.id).subscribe(res => this.aspectosPuntuacion= res)
  }

}
