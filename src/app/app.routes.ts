

import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FlightSearchComponent } from './flight-booking/flight-search/flight-search.component';
import { PassengerSearchComponent } from './flight-booking/passenger-search/passenger-search.component';
const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'flight-search',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
/*
*/
  {
    path: '**',
    redirectTo: 'home'
  }
]

export const AppRouterModule = RouterModule.forRoot(APP_ROUTES, {
  //useHash: true
});
