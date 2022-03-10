import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TipoeventoService } from 'src/app/services/tipoevento.service';
import {latLng, MapOptions, tileLayer, Map, Marker, icon} from 'leaflet';
import { EventoService } from 'src/app/services/evento.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-evento',
  templateUrl: './nuevo-evento.component.html',
  styleUrls: ['../../../app.component.css','./nuevo-evento.component.css'],
})
export class NuevoEventoComponent implements OnInit {

  evento: FormGroup
  tipoEventos: any
  provincias: any
  map: Map;
  mapOptions: MapOptions;
  marker = new Marker([-34.921035, -57.954522])
  latAndLng = [0,0]

  constructor(private authService: AuthService, private http: HttpClient, private eventoService: EventoService, private tipoEventoService: TipoeventoService, private router: Router) { }

  ngOnInit(): void {
    var today = new Date().toISOString().slice(0, 16);

    document.getElementById("fechahora")?.setAttribute("min", today)
    this.http.get("https://apis.datos.gob.ar/georef/api/provincias").subscribe((res: any) => {(this.provincias = res.provincias.map((p:any) => p.nombre).sort())})
    this.tipoEventoService.getTipoEventos().subscribe( res => {console.log(res); this.tipoEventos = res})
    this.initializeMapOptions();

  this.evento = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    provincia: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    cp: new FormControl('', [Validators.required]),
    tipoEvento: new FormControl('', [Validators.required]),
    fechaHora: new FormControl('', [Validators.required]),
    geolocalizacion: new FormControl('',[Validators.required])
  })
  }

  onMapReady(map: Map) {
    this.map = map;
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

  addMarker(lat: number,lng:number){
    if (this.marker) {
      this.marker.remove()
  };
    this.marker = new Marker([lat,lng]).addTo(this.map);
  }

  getCoords(){
   var lat: any
   var lng: any
   this.map.addEventListener('click', (e:any) => {this.latAndLng[0]=(e.latlng.lat); this.latAndLng[1]=(e.latlng.lng); this.addMarker(e.latlng.lat,e.latlng.lng)});
};


  onSubmit(){

    this.evento.patchValue({
      geolocalizacion: this.latAndLng.toString()
    });

    var datos= this.evento.value

    datos.fechaHora = datos.fechaHora.replace('T', ' ')

    datos["usuario"] = {
      id: this.authService.obtenerIdUsuario()
    }

    datos["tipoEvento"] = {
      id: datos["tipoEvento"]
    }
    console.log(datos)

    this.eventoService.nuevoEvento(datos).subscribe(() =>{
      Swal.fire(
        '¡Listo!',
        'Tu evento ha sido creado',
        'success'
      )
      this.router.navigate(["eventos"]);

      });
  }

}
