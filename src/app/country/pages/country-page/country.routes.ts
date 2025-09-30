import { Routes } from '@angular/router';
import { CountryPageComponent } from './country-page.component';

export const countryRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        title: 'Country',
        component: CountryPageComponent,
      },
      {
        path: '**',
        redirectTo: 'basic',
      },
    ],
  },
];
