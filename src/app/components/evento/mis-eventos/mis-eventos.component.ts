import { Evento } from './../../../models/evento';
import { Component, OnInit } from '@angular/core';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-mis-eventos',
  templateUrl: './mis-eventos.component.html',
  styleUrls: ['../../../app.component.css'],
})
export class MisEventosComponent implements OnInit {

  public listEventos: Array<Evento> = [];


  constructor(private eventoService: EventoService) { }

  ngOnInit(): void {
    this.obtenerMisEventos()
  }

  obtenerMisEventos(){
    this.eventoService.getEventos().subscribe(res =>{
      this.listEventos = res;
    })
  }
}
