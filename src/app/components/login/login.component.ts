import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../app.component.css']
})

export class LoginComponent {
  constructor(private authService: AuthService) { }
  onSubmit(data: string){
    console.log(data);
    this.authService.login(data)
  }
}
