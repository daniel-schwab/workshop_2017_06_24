import { CityPipe } from './city.pipe';

describe('CityPipe', () => {

  const pipe = new CityPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform "Graz" to "Flughafen Graz Thalerhof"', () => {
    expect(pipe.transform('Graz')).toBe('Flughafen Graz Thalerhof');
  });

  it('should transform "Graz" to "GRZ" when second parameter is short', () => {
    expect(pipe.transform('Graz','short')).toBe('GRZ');
  });

  it('should transform "Angular City" to "Angular City"', () => {
    expect(pipe.transform('Angular City')).toBe('Angular City');
  })
});
