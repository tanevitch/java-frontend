import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MisServiciosComponent } from './components/servicio/mis-servicios/mis-servicios.component';
import { NuevoServicioComponent } from './components/servicio/nuevo-servicio/nuevo-servicio.component';
import { RegistroComponent } from './components/registro/registro.component';
import { EditarServicioComponent} from './components/servicio/editar-servicio/editar-servicio.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PerfilComponent } from './components/usuario/perfil/perfil.component';
import { buscarServicioComponent } from './components/servicio/todos-servicios/todos-servicios.component';
import { ProtegerRutaGuard } from './guards/proteger-ruta.guard';
import { ReservarServicioComponent } from './components/servicio/reservar-servicio/reservar-servicio.component';
import { MisReservasComponent } from './components/reserva/mis-reservas/mis-reservas.component';
import { GestionReservasComponent } from './components/reserva/gestion-reservas/gestion-reservas.component';
import { NuevoEventoComponent } from './components/evento/nuevo-evento/nuevo-evento.component';
import { MisEventosComponent } from './components/evento/mis-eventos/mis-eventos.component';
const routes: Routes = [
      { path : 'login', component: LoginComponent},
      { path : 'registro', component: RegistroComponent},
      { path : '', component: HomeComponent},
      { path : 'perfil', component: PerfilComponent, canActivate: [ProtegerRutaGuard]},
      { path : 'servicios', component: MisServiciosComponent, canActivate: [ProtegerRutaGuard]},
      { path : 'servicios/nuevo', component: NuevoServicioComponent, canActivate: [ProtegerRutaGuard]},
      { path : 'servicios/editar/:id', component: EditarServicioComponent, canActivate: [ProtegerRutaGuard]},
      { path : 'servicios/:id/reservas', component:  GestionReservasComponent, canActivate: [ProtegerRutaGuard]},
      { path : 'dashboard', component: DashboardComponent, canActivate: [ProtegerRutaGuard]},
      { path : 'buscarServicio', component: buscarServicioComponent, canActivate: [ProtegerRutaGuard]},
      { path : 'reservarServicio/:id', component: ReservarServicioComponent, canActivate: [ProtegerRutaGuard]},
      { path : 'misReservas', component:  MisReservasComponent, canActivate: [ProtegerRutaGuard]},
      { path : 'eventos/nuevo', component: NuevoEventoComponent, canActivate: [ProtegerRutaGuard]},
      { path : 'eventos', component: MisEventosComponent, canActivate: [ProtegerRutaGuard]},

];


export const routing = RouterModule.forRoot(routes)
