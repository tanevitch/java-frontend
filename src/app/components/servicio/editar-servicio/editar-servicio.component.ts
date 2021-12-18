import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { TipoServicioService } from 'src/app/services/tiposervicio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-servicio',
  templateUrl: './editar-servicio.component.html',
  styleUrls: ['../../../app.component.css'],
})
export class EditarServicioComponent implements OnInit {
  id= window.location.pathname.split("/").pop()
  servicio: FormGroup;
  tiposervicios: any
  tipoActual: any
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
    
    this.foto = "data:image/png;base64,"+btoa(e.target.result);
  }
  ngOnInit() {
    this.tipoServicioService.getCategorias().subscribe(res =>{
      this.tiposervicios= res;
    })

    this.servicio = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      tipoServicio: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      whatsapp: new FormControl('', [Validators.required]),
      instagram: new FormControl(''),
      twitter: new FormControl(''),
      foto: new FormControl(''),
      url: new FormControl('')
    });

    this.servicioService.getServicioConId(this.id).subscribe( res => {
      this.tipoActual = res.tipoServicio
      this.foto = res.foto
      this.servicio.patchValue(res)
      var opt = document.getElementById(this.tipoActual.id);
      opt?.setAttribute("selected", "selected")
    })
  }



  constructor(private authService: AuthService, private tipoServicioService: TipoServicioService, private servicioService: ServicioService, private router: Router) { }

  volver(){
    this.router.navigate(["servicios"]);
  }

  onSubmit(){
    var datos= this.servicio.value
    datos["id"]= this.id
    datos["usuario"] = {
      id: this.authService.obtenerIdUsuario()
    }
    datos["tipoServicio"]={
      id: datos["tipoServicio"]
    }
    datos["foto"]= this.foto
    this.servicioService.editarServicio(datos).subscribe(
      () =>{
        Swal.fire(
          '¡Listo!',
          'Tu servicio ha sido creado.',
          'success'
        )
        this.router.navigate(["servicios"]);
      });
  }
}
