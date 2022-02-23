import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PuntuacionService } from 'src/app/services/puntuacion.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { TipoServicioService } from 'src/app/services/tiposervicio.service';
import { Servicio } from '../../../models/servicio/servicio';
import { ServicioService } from '../../../services/servicio.service';

@Component({
  selector: 'app-todos-servicios',
  templateUrl: './todos-servicios.component.html',
  styleUrls: ['./todos-servicios.component.css', '../../../app.component.css']
})


export class buscarServicioComponent implements OnInit {
  public listServicios: Array<Servicio> = [];
  public listTipoServicio: Array<any> = [];
  servicioFiltro: ""
  categoriaFiltro: ""
  mejoresPuntuados: any
  
  constructor(public authService: AuthService, private servicioService: ServicioService, private tipoServicioService: TipoServicioService, private reservaService: ReservaService, private puntuacionService: PuntuacionService) { }

  ngOnInit(): void {
    this.servicioService.getMejorPuntuados().subscribe(res => {
      this.mejoresPuntuados= res
      console.log(res)
    });
    this.obtenerServicios(); 
    this.tipoServicioService.getCategorias().subscribe(res =>{
      this.listTipoServicio = res;  })
    }

  userLogueado(){
    return this.authService.obtenerIdUsuario()
  }
  obtenerServicios(){
    this.servicioService.getServicios().subscribe(res =>{
        this.listServicios = res;
        this.listServicios.forEach( (s:any) => {
        
          this.puntuacionService.promedioServicio(s.id).subscribe( (p:any) => {
            s.promedioPuntuaciones= p
          } )
         })
         this.servicioFiltro= ""
         this.categoriaFiltro= ""
    })
    
  }

  buscarServicios(){

    this.servicioService.getServicioConFiltro(this.servicioFiltro, this.categoriaFiltro).subscribe(res =>{
      if (res == null){
        this.listServicios= []
      }
      else{
        this.listServicios = res;
        this.listServicios.forEach( (s:any) => {
        
          this.puntuacionService.promedioServicio(s.id).subscribe( (p:any) => {
            s.promedioPuntuaciones= p
          } )
        })
      }
  })

}

   
  reservar(servicio: Servicio){
    this.reservaService.reservarServicio(servicio)
  }
}
