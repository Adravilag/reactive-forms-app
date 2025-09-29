import { Routes } from '@angular/router';
import { BasicPageComponent } from '../../../reactive/pages/basic-page/basic-page.component';
import { DynamicPageComponent } from '../../../reactive/pages/dynamic-page/dynamic-page.component';
import { SwitchesPageComponent } from '../../../reactive/pages/switches-page/switches-page.component';

export const countryRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'basic',
        title: 'Basic',
        component: BasicPageComponent,
      },
      {
        path: 'dynamic',
        title: 'Dynamic',
        component: DynamicPageComponent,
      },
      {
        path: 'switches',
        title: 'Switches',
        component: SwitchesPageComponent
      },
      {
        path: '**',
        redirectTo: 'basic',
      },
    ],
  },
];
