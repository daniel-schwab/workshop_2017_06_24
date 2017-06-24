import { OnDestroy, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'city'
})
export class CityPipe implements PipeTransform {

    transform(value: any, type?: string): any {

        let long;
        let short;

        switch (value) {
            case 'Graz':
                long = 'Flughafen Graz Thalerhof';
                short = 'GRZ';
                break;
            case 'Hamburg':
                long = 'Airport Hamburg "Helmut Schmidt';
                short = 'HAM';
                break;
            default:
                long = short = value;
        }

        if(type === 'short') {
            return short;
        }

        return long;
    }

}
