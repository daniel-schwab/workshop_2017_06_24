import { Component, Input, EventEmitter, Output, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Flight } from '../../entities/flight';
import { animate, group, keyframes, state, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'flight-card',
    templateUrl: './flight-card.component.html',
    animations: [
        trigger('select', [
            state('0', style({
                'background-color': 'lightsteelblue'
            })),
            state('1', style({
                'background-color': 'orange'
            })),
            state('void', style({
                'background-color': 'grey'
            })),
            state('*', style({
                'background-color': 'lightgrey'
            })),
            transition('1 => 0', animate('1s 200ms cubic-bezier(0.19,0.88,1,0.52)')),
            transition('0 => 1', [
                style({
                    'opacity': 0
                }),
                group([
                    animate(500, keyframes([
                        style({transform: 'translate3d(0,-30px,0)', offset: 0.2}),
                        style({transform: 'translate3d(0,50px,0)', offset: 0.4}),
                        style({transform: 'translate3d(0,-40px,0)', offset: 0.9}),
                        style({transform: 'translate3d(0,0,0)', offset: 1})
                    ])),
                    animate(300, style({
                        'opacity': 1
                    }))
                ]),
                animate(500)
            ]),
            transition('* => *', animate(500))
        ])
    ]
})
export class FlightCardComponent implements OnInit, OnChanges {


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

    disabled = false;

    start() {
        this.disabled = true;
    }

    done() {
        this.disabled = false;
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
