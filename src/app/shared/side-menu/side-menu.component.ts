import { Component } from '@angular/core';
import { ReactiveRoutes } from '../../reactive/reactive.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
  path: string;
  title: string;
}

const reactiveItems = ReactiveRoutes[0].children ?? [];

@Component({
  selector: 'app-side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {

  reactiveMenu: MenuItem[] = reactiveItems.filter(item => item.title).map(item => ({
    path: `/reactive/${item.path}`,
    title: `${item.title}`
  }));

  authMenu: MenuItem[] = [
    {
      path: '/auth',
      title: 'Registro'
    }
  ];

  countryMenu: MenuItem[] = [
    {
      path: '/country',
      title: 'Países'
    }
  ];

}
