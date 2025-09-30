import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Country } from '@app/country/interfaces/country.interface';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  public fb = inject(FormBuilder);
  public myForm = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });

  public countryService = inject(CountryService);
  public regions = signal(this.countryService.countries);
  public countriesByRegion = signal<Country[]>([]);
  public bordersByCountry = signal<Country[]>([]);

  onFormChanged = effect((onCleanUp) => {
    const regionSubscription = this.onRegionChanged();
    const countrySubscription = this.onCountryChanged();
    onCleanUp(() => {
      regionSubscription.unsubscribe();
      countrySubscription.unsubscribe();
    });
  });

  onRegionChanged() {
    return this.myForm.get('region')!.valueChanges.pipe(
      tap(() => this.myForm.get('country')!.setValue('')),
      tap(() => this.myForm.get('border')!.setValue('')),
      tap( (region) => {
        this.bordersByCountry.set([]);
        this.countriesByRegion.set([]);
        if (!region) return;
      }),
      switchMap( (region) => this.countryService.getCountriesByRegion(region ?? '') !)
    ).subscribe( countries => {
      this.countriesByRegion.set(countries);
    });
  }

  onCountryChanged() {
    return this.myForm.get('country')!.valueChanges.pipe(
      tap(() => this.myForm.get('border')!.setValue('')),
      filter( value => value!.length > 0 ),
      switchMap( (alphaCode) => this.countryService.getCountryByAlphaCode(alphaCode ?? '') ),
      switchMap( (country) => this.countryService.getCountryBorderByCodes(country.borders ?? []) ! )
    ).subscribe( borders => {
      this.bordersByCountry.set(borders);
    });
  }

  constructor() {
    this.onRegionChanged();
    this.onCountryChanged();
  }

}
