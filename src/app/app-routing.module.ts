
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MisServiciosComponent } from './components/servicio/mis-servicios/mis-servicios.component';
import { NuevoServicioComponent } from './components/servicio/nuevo-servicio/nuevo-servicio.component';
import { RegistroComponent } from './components/registro/registro.component';
import { EditarServicioComponent} from './components/servicio/editar-servicio/editar-servicio.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PerfilComponent } from './components/usuario/perfil/perfil.component';
import { TodosServiciosComponent } from './components/servicio/todos-servicios/todos-servicios.component';
import { ProtegerRutaGuard } from './guards/proteger-ruta.guard';

const routes: Routes = [
      { path : 'login', component: LoginComponent},
      { path : 'registro', component: RegistroComponent},
      { path : '', component: HomeComponent},
      { path : 'perfil', component: PerfilComponent },
      { path : 'servicios', component: MisServiciosComponent, canActivate: [ProtegerRutaGuard]},
      { path : 'servicios/nuevo', component: NuevoServicioComponent, canActivate: [ProtegerRutaGuard]},
      { path : 'servicios/editar/:id', component: EditarServicioComponent, canActivate: [ProtegerRutaGuard]},
      { path : 'dashboard', component: DashboardComponent, canActivate: [ProtegerRutaGuard]},
      { path : 'todosservicios', component: TodosServiciosComponent, canActivate: [ProtegerRutaGuard]},            
];


export const routing = RouterModule.forRoot(routes) 
