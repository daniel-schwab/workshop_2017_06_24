import { CityPipe } from './city.pipe';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
    template: `
        <p id="long">{{'Graz' | city}}</p>
        <p id="short">{{'Graz' | city:'short'}}</p>
        <p id="wrong">{{'Angular City' | city}}</p>
    `
})
class CityPipeComponent {
}

let fixture: ComponentFixture<CityPipeComponent>;

describe('CityPipe', () => {

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [CityPipeComponent, CityPipe]
        }).createComponent(CityPipeComponent);

        fixture.detectChanges();
    });


    it('should transform "Graz" to "Flughafen Graz Thalerhof"', () => {
        const p: DebugElement = fixture.debugElement.query(By.css('#long'));
        expect(p.nativeElement.innerHTML).toBe('Flughafen Graz Thalerhof');
    });

    it('should transform "Graz" to "GRZ" when second parameter is short', () => {
        const p: DebugElement = fixture.debugElement.query(By.css('#short'));
        expect(p.nativeElement.innerHTML).toBe('GRZ');
    });

    it('should transform "Angular City" to "Angular City"', () => {
        const p: DebugElement = fixture.debugElement.query(By.css('#wrong'));
        expect(p.nativeElement.innerHTML).toBe('Angular City');
    });

});
