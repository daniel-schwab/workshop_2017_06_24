import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FlightSearchComponent } from './flight-search.component';
import { FormsModule } from '@angular/forms';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { FlightService } from './flight.service';
import { By } from '@angular/platform-browser';


describe('FlightSearchComponent', () => {

    let fixture: ComponentFixture<FlightSearchComponent>;
    let h1: DebugElement;

    const flight = {
        id: 1234,
        from: 'Hamburg',
        to: 'Graz'
    };

    const flightServiceStub = {
        flights: [flight, flight],
        find: () => {
        }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [FlightSearchComponent],
            imports: [FormsModule],
            providers: [
                {provide: FlightService, useValue: flightServiceStub}
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(FlightSearchComponent);
        h1 = fixture.debugElement.query(By.css('h1'));
    });

    it('should display search title', () => {
        expect(h1.nativeElement.textContent).toBe('');
        fixture.detectChanges();
        expect(h1.nativeElement.textContent).toBe('Flight Search');
    });

    it('should change title', () => {
        fixture.componentInstance.title = 'title change';
        expect(h1.nativeElement.textContent).toBe('');
        fixture.detectChanges();
        expect(h1.nativeElement.textContent).toBe('title change');
    });

    it('should search on button click', inject([FlightService], (flightService: FlightService) => {
        const button: DebugElement = fixture.debugElement.query(By.css('button'));
        const component = fixture.componentInstance;

        component.from = 'Hamburg';
        component.to = 'Graz';

        spyOn(flightService, 'find').and.callThrough();
        button.triggerEventHandler('click', null);

        expect(flightService.find).toHaveBeenCalled();
        expect(flightService.find).toHaveBeenCalledWith('Hamburg', 'Graz');

    }));

});