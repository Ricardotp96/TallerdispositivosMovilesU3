import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'portada',
    loadComponent: () => import('./portada/portada.page').then( m => m.PortadaPage)
  },
];
