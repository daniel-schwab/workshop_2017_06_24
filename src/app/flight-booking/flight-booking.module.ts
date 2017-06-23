

import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { FlightCardComponent } from './flight-search/flight-card.component';
import { PassengerSearchComponent } from './passenger-search/passenger-search.component';
import { FlightBookingRouterModule } from './flight-booking.routes';
import { FlightEditComponent } from './flight-edit/flight-edit.component';
import { FlightService } from './flight-search/flight.service';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    CommonModule,
    FlightBookingRouterModule
  ],
  declarations: [
    FlightSearchComponent,
    FlightCardComponent,
    PassengerSearchComponent,
    FlightEditComponent
  ],
  providers: [
    FlightService
  ],
  exports: [
    FlightSearchComponent
  ]
})
export class FlightBookingModule {

}
