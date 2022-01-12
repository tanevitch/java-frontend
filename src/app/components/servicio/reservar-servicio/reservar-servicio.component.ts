import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Evento } from 'src/app/models/evento';
import { Servicio } from 'src/app/models/servicio/servicio';
import { Usuario } from 'src/app/models/usuario/usuario';
import { EventoService } from 'src/app/services/evento.service';
import { FormapagoService } from 'src/app/services/formapago.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservar-servicio',
  templateUrl: './reservar-servicio.component.html',
  styleUrls: ['../../../app.component.css'],
})
export class ReservarServicioComponent implements OnInit {
  eventos: any
  formapagos: any
  reserva: FormGroup
  usuario: Usuario
  servicio: Servicio;

  constructor(private router: Router,
    private eventoService: EventoService,
    private formaPagosService: FormapagoService,
    private reservaService: ReservaService,
    private servicioService: ServicioService,
    private userService: UsuarioService) { }

  ngOnInit(): void {
    this.eventoService.getEventos().subscribe(res =>{
      this.eventos= res;
    })
    this.formaPagosService.getFormasDePago().subscribe(res =>{
      this.formapagos= res;
    })
    
    this.reserva = new FormGroup({
      servicio: new FormControl('', [Validators.required]),
      evento: new FormControl('', [Validators.required]),
      formaDePago: new FormControl('', [Validators.required]),
      telefono:  new FormControl('', [Validators.required]),
      email:  new FormControl('', [Validators.required]),
      fechaHora:  new FormControl('', [Validators.required]),
      detalle:  new FormControl('', [Validators.required]),
    });

    this.userService.getDatos().subscribe(res => {
      this.usuario= res
      this.reserva.patchValue(
        {email: this.usuario.mail})
    });

    this.servicioService.getServicioConId(window.location.pathname.split("/").pop()).subscribe(
      res =>{
        this.servicio= res
        this.reserva.patchValue(
          {servicio: this.servicio.nombre}
          )
      }
    )
  }

  onSubmit(){
    var datos = this.reserva.value
    datos["usuario"]= {
      id: this.usuario.id
    }
    datos["servicio"]={
      id: this.servicio.id
    }
    datos["evento"]={
      id: datos["evento"]
    }
    datos["formaDePago"]={
      id: datos["formaDePago"]
    }
    console.log(datos)
    this.reservaService.nuevaReserva(datos).subscribe(() =>{
      Swal.fire(
        '¡Listo!',
        'Tu servicio ha sido creado.',
        'success'
      )
      this.router.navigate(["misReservas"]);

    })
  }

}
