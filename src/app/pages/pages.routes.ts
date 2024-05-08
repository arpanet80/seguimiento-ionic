import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'home', loadComponent: () => import('./home/home.component').then( m => m.HomeComponent), data: {titulo: 'Home'} },
  { path: 'despliegue', loadComponent: () => import('./despliegue/despliegue.component').then( m => m.DespliegueComponent), data: {titulo: 'Despliegue'}  },
  { path: 'config', loadComponent: () => import('./configuracion/configuracion.component').then( m => m.ConfiguracionComponent), data: {titulo: 'Configuracion'} },
];
