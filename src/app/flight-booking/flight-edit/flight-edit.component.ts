import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  template: `
    <h1>Flight Edit</h1>
    <div class="card">
    <p>Id: {{id}}</p>
    <p>ShowDetails: {{showDetails}}</p>
    </div>
  `
})
export class FlightEditComponent implements OnInit {
  id: string;
  showDetails: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      p => {
        this.id = p['id'];
        this.showDetails = p['showDetails'];
      }
    )
  }
}
