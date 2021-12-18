import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../../app.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  irApublicarServicio(): void {
    this.router.navigate(["servicios/nuevo/"])
  }

  irAVerMisServicio(): void {
    this.router.navigate(["servicios"])    
  }

  irAVerServicios(): void {
    this.router.navigate(["todosservicios"])      
  }
}
