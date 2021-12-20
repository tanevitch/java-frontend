import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TipoeventoService } from 'src/app/services/tipoevento.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-nuevo-evento',
  templateUrl: './nuevo-evento.component.html',
  styleUrls: ['../../../app.component.css'],
})
export class NuevoEventoComponent implements OnInit {

  evento: FormGroup
  tipoEventos: any
  provincias: any

  constructor(private http: HttpClient, private tipoEventoService: TipoeventoService ) { }
  ngOnInit(): void {
    this.http.get("https://apis.datos.gob.ar/georef/api/provincias").subscribe((res: any) => {(this.provincias = res.provincias.map((p:any) => p.nombre).sort())})
  this.tipoEventoService.getTipoEventos().subscribe( res => {console.log(res); this.tipoEventos = res})

  this.evento = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    provincia: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    cp: new FormControl('', [Validators.required]),
    tipoEvento: new FormControl('', [Validators.required]),
    fechaHora: new FormControl('', [Validators.required]),
  })
  }


  onSubmit(){
    var datos= this.evento.value
    console.log(datos)
  }

}
