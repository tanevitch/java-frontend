import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['../../../app.component.css'],
})
export class PerfilComponent implements OnInit {
  usuarioData =
  {
    nombre: "",
    apellido: "",
    mail: "",
    contrasena:""
  }

  successUpdate(){
    Swal.fire(
      'Actualizado!',
      'Usuario editado correctamente',
      'success'
    )
  }


  
  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.usuarioService.getDatos().subscribe(data => {
      this.usuarioData.nombre = data.nombre;
      this.usuarioData.apellido = data.apellido;
      this.usuarioData.mail = data.mail;
    })

    console.log(this.usuarioData);
  }

  onSubmit(data: string) {
    this.usuarioService.editarDatos(this.usuarioData).subscribe(
      res => {
        this.successUpdate();
        this.router.navigate(["dashboard"])
      }
    )
  }
}
