import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ClienteDashboardComponent } from './components/cliente-dashboard/cliente-dashboard.component';
import { ReservarTurnoComponent } from './components/reservar-turno/reservar-turno.component';
import { BarberoDashboardComponent } from './components/barbero-dashboard/barbero-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'cliente',
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'cliente' },
    children: [
      {
        path: 'dashboard',
        component: ClienteDashboardComponent
      },
      {
        path: 'reservar',
        component: ReservarTurnoComponent
      }
    ]
  },
  {
    path: 'barbero',
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'barbero' },
    children: [
      {
        path: 'dashboard',
        component: BarberoDashboardComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
