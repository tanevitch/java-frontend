import { Component, OnInit } from '@angular/core';
import { ReservaService } from 'src/app/services/reserva.service';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['../../../app.component.css'],
})
export class MisReservasComponent implements OnInit {
  reservas: any
  constructor(private reservaService: ReservaService) { }

  ngOnInit(): void {
    this.reservaService.obtenerReservas().subscribe(res => {
      this.reservas= res
    })
  }

}
