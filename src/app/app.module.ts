
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
import { TodosServiciosComponent } from './components/servicio/todos-servicios/todos-servicios.component';
import { PerfilComponent } from './components/usuario/perfil/perfil.component';
import { TokenizerService } from './services/tokenizer.service';
import { ErrorService } from './services/error.service';

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
    TodosServiciosComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass: TokenizerService, multi:true},
    {provide:HTTP_INTERCEPTORS, useClass: ErrorService, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
