import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MisServiciosComponent } from './components/servicio/mis-servicios/mis-servicios.component';
import { NuevoServicioComponent } from './components/servicio/nuevo-servicio/nuevo-servicio.component';
import { RegistroComponent } from './components/registro/registro.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EditarServicioComponent} from './components/servicio/editar-servicio/editar-servicio.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { buscarServicioComponent } from './components/servicio/todos-servicios/todos-servicios.component';
import { PerfilComponent } from './components/usuario/perfil/perfil.component';
import { TokenizerService } from './services/tokenizer.service';
import { ErrorService } from './services/error.service';
import { ReservarServicioComponent } from './components/servicio/reservar-servicio/reservar-servicio.component';
import { MisReservasComponent } from './components/reserva/mis-reservas/mis-reservas.component';
import { GestionReservasComponent } from './components/reserva/gestion-reservas/gestion-reservas.component';
import { NuevoEventoComponent } from './components/evento/nuevo-evento/nuevo-evento.component';
import { MisEventosComponent } from './components/evento/mis-eventos/mis-eventos.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';

@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    AppComponent,
    HomeComponent,
    MisServiciosComponent,
    NuevoServicioComponent,
    NavbarComponent,
    EditarServicioComponent,
    DashboardComponent,
    buscarServicioComponent,
    PerfilComponent,
    ReservarServicioComponent,
    MisReservasComponent,
    GestionReservasComponent,
    NuevoEventoComponent,
    MisEventosComponent,
    ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LeafletModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass: TokenizerService, multi:true},
    {provide:HTTP_INTERCEPTORS, useClass: ErrorService, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
