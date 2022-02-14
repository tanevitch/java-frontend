import { EventoService } from './../../../services/evento.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reserva } from 'src/app/models/reserva/reserva';
import { Servicio } from 'src/app/models/servicio/servicio';
import { ReservaService } from 'src/app/services/reserva.service';
import { ServicioService } from 'src/app/services/servicio.service';
import {latLng, MapOptions, tileLayer, Map, Marker, icon} from 'leaflet';
import Swal from 'sweetalert2';
import { Evento } from 'src/app/models/evento';
import { AspectoPuntuacion } from 'src/app/models/puntuacion/puntuacion';
import { PuntuacionService } from 'src/app/services/puntuacion.service';

@Component({
  selector: 'app-gestion-reservas',
  templateUrl: './gestion-reservas.component.html',
  styleUrls: ['../../../app.component.css'],
})


export class GestionReservasComponent implements OnInit {
  reservasPendientes: any
  reservasCanceladas: any
  reservasSinConfirmar: any

  servicio: Servicio
  puntuaciones: any

  evento: Evento
  map: Map;
  mapOptions: MapOptions;
  marker = new Marker([-34.921035, -57.954522])

  constructor(private puntuacionService: PuntuacionService, private router: Router, private reservaService: ReservaService, private servicioService: ServicioService) { }

  ngOnInit(): void {
    let id= window.location.pathname.split("/")[2];
    this.servicioService.getServicioConId(id).subscribe(res => this.servicio= res);
    this.puntuacionService.obtenerPuntuaciones(id).subscribe(res => {
      this.puntuaciones = res
      console.log(res)
    })
    this.reservaService.obtenerReservasDeServicio(id, "SINCONFIRMAR").subscribe(
      res => {
        this.reservasSinConfirmar = res
      }
    )
    this.initializeMapOptions();
    this.reservaService.obtenerReservasDeServicio(id, "CANCELADA").subscribe(
      res => {
        this.reservasCanceladas = res
      }
    )
    this.reservaService.obtenerReservasDeServicio(id, "CONFIRMADA").subscribe(
      res => {
        this.reservasPendientes = res
      }
    )
  }

  confirmar(reserva: Reserva){
    this.reservaService.cambiarEstado(reserva.id, "CONFIRMADA").subscribe(() => {
      Swal.fire(
        '¡Listo!',
        'Reserva confirmada',
        'success'
      ).then(
        () =>  {
         window.location.reload();
        }

       )
    })
  }

  marcarComoFinalizada(reserva: Reserva){
    this.reservaService.cambiarEstado(reserva.id, "FINALIZADA").subscribe(() => {
      Swal.fire(
        '¡Listo!',
        'Reserva finalizada',
        'success'
      ).then(
        () =>  {
         window.location.reload();
        }

       )
    })
  }

  rechazar(reserva: Reserva){
    this.reservaService.cambiarEstado(reserva.id, "RECHAZADA").subscribe(() => {
      Swal.fire(
        '¡Listo!',
        'Reserva rechazada',
        'success'
      ).then(
       () =>  {
        window.location.reload();
       }

      )
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

  onMapReady(map: Map) {
    this.map = map;

  }

  addMarker(lat: string,mapita:Map){

    if (this.marker) {
      this.marker.remove()
  };
  var xd = lat.split(",").map(Number)
    this.marker = new Marker([xd[0],xd[1]]).addTo(this.map);
  var bool = true
    setInterval(function () {  
        mapita.invalidateSize();
        if (bool){ 
          mapita.flyTo([xd[0],xd[1]]); 
          bool= false}  }
        , 200);
 
}

  private initializeMapOptions() {
    this.mapOptions = {
      center: latLng(-34.921035, -57.954522),
      zoom: 13,
      layers: [
        tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            maxZoom: 18,
            attribution: 'Map data © OpenStreetMap contributors'
          })
      ],
    };
  }

}
