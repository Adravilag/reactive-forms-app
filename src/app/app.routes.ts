import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'reactive',
    loadChildren: () => import('./reactive/reactive.routes').then(m => m.ReactiveRoutes)
  },
  {
    path: 'country',
    loadChildren: () => import('./country/pages/country-page/country.routes').then(m => m.countryRoutes)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/pages/register-page/auth.routes').then(m => m.authRoutes)
  },

  {
    path: '**',
    redirectTo: 'country',
  }
];
