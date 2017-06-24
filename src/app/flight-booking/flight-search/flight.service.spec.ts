import { TestBed, inject, async, fakeAsync, tick } from '@angular/core/testing';
import { ConnectionBackend, BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BASE_URL } from '../../app.tokens';
import 'rxjs/add/operator/map';

import { Flight } from '../../entities/flight';
import { FlightService } from './flight.service';

let flightService: FlightService;

const flight: Flight = {
    id: 12,
    date: new Date().toISOString(),
    from: 'Graz',
    to: 'Hamburg'
};

const hamburgToGraz: Flight = {
    id: 12,
    date: new Date().toISOString(),
    from: 'Hamburg',
    to: 'Graz'
};


describe('FlightService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                FlightService,
                MockBackend,
                BaseRequestOptions,
                {provide: BASE_URL, useValue: 'localhost'},
                {
                    provide: Http,
                    useFactory: function (backend: MockBackend, defaultOptions: BaseRequestOptions) {
                        return new Http(backend, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                }
            ]
        });
    });

    beforeEach(inject([MockBackend, FlightService], (mockBackend: MockBackend, _flightService: FlightService) => {

        flightService = _flightService;

        mockBackend.connections.subscribe((mockConnection: MockConnection) => {

            // Timeout zur Simulation längerer Response Zeit
            setTimeout(() => {

                // HTTP Response
                if (mockConnection.request.url.endsWith('from=Graz&to=Hamburg')) {
                    mockConnection.mockRespond(new Response(
                        new ResponseOptions(
                            {
                                body: JSON.stringify(flight)
                            }
                        )
                    ));
                } else if (mockConnection.request.url.endsWith('from=Hamburg&to=Graz')) {
                    mockConnection.mockRespond(new Response(
                        new ResponseOptions(
                            {
                                body: JSON.stringify(hamburgToGraz)
                            }
                        )
                    ));
                }


            }, 200);

        });

    }));

    it('should find a flight by id with jasmine.done', (done) => {
        flightService.findAndReturn('Hamburg', 'Graz').subscribe(item => {
            expect(item).toEqual(hamburgToGraz);
            done();
        });
    });

    it('should find a flight by id with async', async(() => {
        flightService.findAndReturn('Graz', 'Hamburg').subscribe(item => {
            expect(item).toEqual(flight);
        });
    }));

    it('should find a flight by id with fakeAsync', fakeAsync(() => {
        let response;
        flightService.findAndReturn('Graz', 'Hamburg').subscribe(item => response = item);

        tick(100);
        expect(response).toBeUndefined();

        tick(100);
        expect(response).toEqual(flight);
    }));

});
