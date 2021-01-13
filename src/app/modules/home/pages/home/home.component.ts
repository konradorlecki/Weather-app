import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { MapsAPILoader } from '@agm/core';
import { select, Store } from '@ngrx/store';

import { AppState } from '../../../../store/states/app.state';
import { WeatherActions } from '../../../../store/actions';
import { FormControl } from '@angular/forms';
import { WeatherInterface } from '../../../../models/weatherInterface';
import { selectCitiesWeather } from '../../../../store/selectors/weather.selectors';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('cityInput') cityInput: ElementRef;

  public cityInputFormControl = new FormControl('');
  public citiesWeather: WeatherInterface[];

  private ngDestroyed$ = new Subject();

  constructor(
    private mapsApiLoader: MapsAPILoader,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    const cityIds = JSON.parse(localStorage.getItem('cityIds') as string);
    if (cityIds?.length) {
      this.store.dispatch(WeatherActions.getCitiesById({ citiesId: cityIds }))
    }
    this.store.pipe(select(selectCitiesWeather))
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((citiesWeather: WeatherInterface[]) => {
        this.citiesWeather = citiesWeather
      })
  }

  ngAfterViewInit() {
    this.initAutoComplete();
  }

  ngOnDestroy() {
    this.ngDestroyed$.next();
  }

  private initAutoComplete(): void {
    this.mapsApiLoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(
        this.cityInput.nativeElement, { types: ['(cities)'] }
      );

      autocomplete.addListener('place_changed', () => {
        const address = autocomplete.getPlace();
        this.cityInputFormControl.patchValue(address.name);
      });
    });
  }

  public onAddCity(): void {
    if (this.cityInputFormControl.valid && this.cityInputFormControl.value) {
      this.store.dispatch(WeatherActions.getCityByName({ cityName: this.cityInputFormControl.value }));
      this.cityInputFormControl.patchValue('');
    }
  }

  public onDeleteCity(weatherId: number): void {
    this.store.dispatch(WeatherActions.deleteCityWeather({ weatherId }));
  }
}
