import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { WeatherActions } from '../actions';
import { WeatherService } from '../../services/weather.service';

@Injectable()
export class WeatherEffects {
  constructor(
    private actions$: Actions,
    private weatherService: WeatherService,
  ) { }

  getCityByName$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.getCityByName),
      exhaustMap((action) => {
        return this.weatherService.getCityByName(action.cityName).pipe(
          switchMap(res => of(WeatherActions.successGetCityByName({ weather: res })))
        );
      })
    )
  );
}
