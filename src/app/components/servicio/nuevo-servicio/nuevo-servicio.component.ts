import { Servicio } from './../../../models/servicio/servicio';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { TipoServicioService } from 'src/app/services/tiposervicio.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-servicio',
  templateUrl: './nuevo-servicio.component.html',
  styleUrls: ['../../../app.component.css'],
})
export class NuevoServicioComponent implements OnInit {
  servicio: FormGroup;
  tiposervicios: any
  foto: string;

  onUploadChange(evt: any) {
    const file = evt.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(e: any) {
    this.foto ="data:image/png;base64,"+btoa(e.target.result);
  }

  ngOnInit() {
    this.tipoServicioService.getCategorias().subscribe(res =>{
      this.tiposervicios= res;
    })
    this.servicio = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      tipoServicio: new FormControl(this.tiposervicios, [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      whatsapp: new FormControl('', [Validators.required]),
      instagram: new FormControl(''),
      twitter: new FormControl(''),
      foto: new FormControl(''),
      url: new FormControl('')
    });
  }
  constructor(private authService: AuthService, private tipoServicioService: TipoServicioService, private servicioService: ServicioService,  private router: Router) { }


  confirmTest(datos: any){
    Swal.fire({
      title: '¿Está seguro que desea crear este servicio?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      reverseButtons: false
    }).then((result) => {
      if (result.isConfirmed) {

        this.servicioService.nuevoServicio(datos).subscribe(() =>{
          Swal.fire(
            '¡Listo!',
            'Tu servicio ha sido creado.',
            'success'
          )
          this.router.navigate(["servicios"]);

          });
      }
    })
  }


  onSubmit(){
    var datos= this.servicio.value
    datos["usuario"] = {
      id: this.authService.obtenerIdUsuario()
    }
    datos["tipoServicio"]={
      id: datos["tipoServicio"]
    }
    datos["foto"]= this.foto
    this.confirmTest(datos)
    console.log(datos)
    }

  }

