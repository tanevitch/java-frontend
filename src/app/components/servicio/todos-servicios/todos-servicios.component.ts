import { Component, OnInit } from '@angular/core';
import { PuntuacionService } from 'src/app/services/puntuacion.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { Servicio } from '../../../models/servicio/servicio';
import { ServicioService } from '../../../services/servicio.service';

@Component({
  selector: 'app-todos-servicios',
  templateUrl: './todos-servicios.component.html',
  styleUrls: ['./todos-servicios.component.css', '../../../app.component.css']
})

export class buscarServicioComponent implements OnInit {
  public listServicios: Array<Servicio> = [];

  constructor(private servicioService: ServicioService, private reservaService: ReservaService, private puntuacionService: PuntuacionService) { }

  ngOnInit(): void {
    this.obtenerServicios();    
  }
  obtenerServicios(){
    this.servicioService.getServicios().subscribe(res =>{
        this.listServicios = res;
        this.listServicios.forEach( (s:any) => {
        
          this.puntuacionService.promedioServicio(s.id).subscribe( (p:any) => {
            console.log(p)
            s.promedioPuntuaciones= p
          } )
           console.log(s.promedioPuntuaciones)
         })
    })
  }

  reservar(servicio: Servicio){
    this.reservaService.reservarServicio(servicio)
  }
}
