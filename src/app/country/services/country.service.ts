import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Country } from '../interfaces/country.interface';
import { forkJoin, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor() { }

  private http = inject(HttpClient);
  private baseUrl = 'https://restcountries.com/v3.1';
  private _countries: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get countries(): string[] {
    return [...this._countries];
  }

  getCountriesByRegion(region: string) : Observable<Country[]> | void {
    if (!region) return;
    const url = `${this.baseUrl}/region/${region}?fields=cca3,name`;
    return this.http.get<Country[]>(url);
  }

  getCountryByAlphaCode(code: string) : Observable<Country> {
    const url = `${this.baseUrl}/alpha/${code}?fields=cca3,name,borders`;
    return this.http.get<Country>(url);
  }

  getCountryBorderByCodes(countryCodes: string[]) : Observable<Country[]> | void {
    if (!countryCodes || countryCodes.length === 0) return of([]);
    const countriesRequests: Observable<Country>[] = [];

    countryCodes.forEach( code => {
      const request = this.getCountryByAlphaCode(code);
      countriesRequests.push(request);
    });
    return forkJoin(countriesRequests);
  }

}
