import { Component, Input, EventEmitter, Output, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Flight } from '../../entities/flight';

@Component({
  selector: 'flight-card',
  templateUrl: './flight-card.component.html'
})
export class FlightCardComponent implements OnInit, OnChanges{


  @Input() item: Flight;
  @Input() selected: boolean;
  @Output() selectedChange = new EventEmitter<boolean>();

  select() {
    this.selected = true;
    this.selectedChange.next(this.selected);
  }

  deselect() {
    this.selected = false;
    this.selectedChange.next(this.selected);
  }

  constructor() {
    // console.debug('ctor', this.selected, this.item);
  }

  ngOnInit(): void {
    // console.debug('init', this.selected, this.item);

    // Böse Aktion!
    //this.selectedChange.next(true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.debug('changes', this.selected, this.item);
    // if (changes['selected']) {
    //   console.debug('selected changed');
    // }
    // if (changes['item']) {
    //   console.debug('item changed');
    // }

  }

}
