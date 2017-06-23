import { Component, ViewEncapsulation } from '@angular/core';
import { Flight } from '../../entities/flight';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { FlightService } from './flight.service';

@Component({
  selector: 'flight-search',
  templateUrl: 'flight-search.component.html',
  // providers: [FlightService]
  // styleUrls: ['./flight-search.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class FlightSearchComponent {

  from: string;
  to: string;

  selectedFlight: Flight

  basket: object = {
    "3": true,
    "4": false,
    "5": true
  };

  // private http: Http;

  constructor(private flightService: FlightService) {
    // this.http = http;
    console.debug('Liebesgrüße aus dem Konstruktor');
  }

  error: boolean;


  // flights: Array<Flight> = [];

  // .flights
  get flights(): Array<Flight> {
    return this.flightService.flights;
  }

  search(): void {

      if (!this.from || !this.to) {
        this.error = true;
        return;
      }

      this
        .flightService
        .find(this.from, this.to);

  }

  select(f: Flight): void {
    this.selectedFlight = f;
  }

}

