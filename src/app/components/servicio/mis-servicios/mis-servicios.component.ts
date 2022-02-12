import { ServicioService } from '../../../services/servicio.service';
import { Component, OnInit } from '@angular/core';

import { Servicio } from '../../../models/servicio/servicio';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { PuntuacionService } from 'src/app/services/puntuacion.service';
@Component({
  selector: 'app-mis-servicios',
  templateUrl: './mis-servicios.component.html',
  styleUrls: ['../../../app.component.css'],
})
export class MisServiciosComponent implements OnInit {

  public listServicios: Array<Servicio> = [];


  constructor(private servicioService: ServicioService, private router: Router, private puntuacionService: PuntuacionService) { }

  confirmDelete(serv: Servicio){
    Swal.fire({
      title: 'Estás por borrar el servicio ' + `${serv.nombre}`,
      text: "No podrás revertirlo",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicioService.borrarServicio(serv).subscribe(()=> {this.obtenerMisServicios()})
        Swal.fire(
          '¡Borrado!',
          'El servicio ha sido borrado.',
          'success'
        )
      }
    })
  }

  ngOnInit(): void {
    this.obtenerMisServicios();
  }

  obtenerMisServicios(){
    this.servicioService.getMisServicios().subscribe(res =>{
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

  borrarServicio(serv: Servicio){
    this.confirmDelete(serv)
  }

  editarServicio(serv: Servicio){
    this.router.navigate([`servicios/editar/${serv.id}`])
  }

  verReservas(serv: Servicio){
    this.router.navigate([`servicios/${serv.id}/reservas`])
  }
}
