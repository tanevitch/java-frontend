import { Component, OnInit } from '@angular/core';
import { Servicio } from '../../../models/servicio/servicio';
import { ServicioService } from '../../../services/servicio.service';

@Component({
  selector: 'app-todos-servicios',
  templateUrl: './todos-servicios.component.html',
  styleUrls: ['./todos-servicios.component.css', '../../../app.component.css']
})

export class TodosServiciosComponent implements OnInit {
  public listServicios: Array<Servicio> = [];

  constructor(private servicioService: ServicioService) { }

  ngOnInit(): void {
    this.obtenerServicios();    
  }
  obtenerServicios(){
    this.servicioService.getServicios().subscribe(res =>{
        this.listServicios = res;
        console.log(res)
    })
  }
}
