import { Injectable } from '@angular/core';

import { Action, select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, tap, withLatestFrom } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { WeatherActions } from '../actions';
import { WeatherService } from '../../services/weather.service';
import { AppState } from '../states/app.state';
import { selectCitiesWeather } from '../selectors/weather.selectors';

@Injectable()
export class WeatherEffects {
  constructor(
    private actions$: Actions,
    private weatherService: WeatherService,
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
  ) {
  }

  getCityByName$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.getCityByName),
      withLatestFrom(
        this.store.pipe(select(selectCitiesWeather))
      ),
      exhaustMap(([action, citiesWeather]) => {
        return this.weatherService.getCityByName(action.cityName).pipe(
          map(res => {
            const cityIds = localStorage.getItem('cityIds')
            let cityDuplicateError = false;

            citiesWeather.map(cityWeather => {
              if (cityWeather.id === res.id) {
                cityDuplicateError = true;
              }
            })

            if (cityDuplicateError) {
              return WeatherActions.cityDuplicateError()
            }

            if (cityIds) {
              localStorage.setItem('cityIds', JSON.stringify([...JSON.parse(cityIds), res.id]));
            } else {
              localStorage.setItem('cityIds', JSON.stringify([res.id]));
            }

            return WeatherActions.successGetCityByName({ weather: res });
          }),
          catchError(() => {
            return of(WeatherActions.notFoundCityError());
          })
        );
      })
    )
  );

  getCitiesById$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.getCitiesById),
      exhaustMap(action => {
        return this.weatherService.getCitiesById(action.citiesId).pipe(
          map(res => {
            return WeatherActions.successGetCitiesById({ weather: res.list });
          })
        );
      })
    )
  );

  deleteCityWeather$: Observable<Action> = createEffect(() =>
      this.actions$.pipe(
        ofType(WeatherActions.deleteCityWeather),
        tap((action) => {
          const cityIds = JSON.parse(localStorage.getItem('cityIds') as string);
          cityIds.splice(cityIds.indexOf(action.weatherId), 1);

          localStorage.setItem('cityIds', JSON.stringify(cityIds));
        })
      ),
    { dispatch: false }
  );

  cityDuplicateError$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.cityDuplicateError),
      tap(() => {
        this.snackBar.open('You already added this city')
      })
    ),
    { dispatch: false }
  );

  notFoundCityError$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.notFoundCityError),
      tap(() => {
        this.snackBar.open('City not found');
      })
    ),
    { dispatch: false }
  )

}
