import { Evento } from './../../../models/evento';
import { Component, OnInit } from '@angular/core';
import { EventoService } from 'src/app/services/evento.service';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-mis-eventos',
  templateUrl: './mis-eventos.component.html',
  styleUrls: ['../../../app.component.css'],
})
export class MisEventosComponent implements OnInit {

  public listEventos: Array<Evento> = [];
  serviciosDelEventoClickeado: any
  eventoClickeado: any
  
  constructor(private eventoService: EventoService, private servicioService: ServicioService) { }

  ngOnInit(): void {
    this.obtenerMisEventos()
  }

  verServiciosDe(evento:any){
    this.eventoClickeado= evento
    this.servicioService.buscarPorEvento(evento.id).subscribe((res:any) => {
      this.serviciosDelEventoClickeado= res
      console.log(this.serviciosDelEventoClickeado)
    })
    
  }
  obtenerMisEventos(){
    this.eventoService.getEventos().subscribe(res =>{
      this.listEventos = res;
    })
  }
}
