import { AppState } from '../states/app.state';
import { createSelector } from '@ngrx/store';

export const selectWeatherState = (state: AppState) => state.weatherData;

export const selectCitiesWeather = createSelector(
  selectWeatherState,
  (citiesWeather) => {
    return citiesWeather.weather;
  }
)
