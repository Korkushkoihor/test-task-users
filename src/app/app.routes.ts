import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: 'users',
    loadComponent: () => import('./users/users.component').then(c => c.UsersComponent)
  },
  {
    path: '**',
    redirectTo: '404'
  },
  {
    path: '404',
    loadComponent: () => import('./shared/components/404/404.component').then(c => c.FourOFourComponent)
  }
];
