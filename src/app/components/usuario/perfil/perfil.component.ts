import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['../../../app.component.css'],
})
export class PerfilComponent implements OnInit {
  usuario: FormGroup
  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    
    this.usuario = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      contrasena: new FormControl('', [Validators.required]),
      mail: new FormControl('', [Validators.required]),
    })
    this.usuarioService.getDatos().subscribe(data => {
      this.usuario.patchValue(data)
    })
     
  }

  onSubmit() {
    this.usuarioService.editarDatos(this.usuario.value).subscribe(
      () => {
        this.successUpdate();
        this.router.navigate(["dashboard"])
      }
    )
  }

  successUpdate(){
    Swal.fire(
      'Actualizado!',
      'Usuario editado correctamente',
      'success'
    )
  }
}
