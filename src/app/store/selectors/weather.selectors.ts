import { createSelector } from '@ngrx/store';

import { AppState } from '../states/app.state';

export const selectWeatherState = (state: AppState) => state.weatherData;

export const selectCitiesWeather = createSelector(
  selectWeatherState,
  (citiesWeather) => {
    return citiesWeather.weather;
  }
);
