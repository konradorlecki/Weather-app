import { createAction, props } from '@ngrx/store';

import { WeatherInterface } from '../../models/weatherInterface';

export const getCityByName = createAction(
  'getCityByName',
  props<{ cityName: string }>()
);

export const successGetCityByName = createAction(
  'successGetCityByName',
  props<{ weather: WeatherInterface }>()
);

export const getCitiesById = createAction(
  'getCitiesById',
  props<{ citiesId: string[] }>()
);

export const successGetCitiesById = createAction(
  'successGetCitiesById',
  props<{ weather: WeatherInterface[] }>()
);

export const deleteCityWeather = createAction(
  'deleteCityWeather',
  props<{ weatherId: number }>()
);

export const cityDuplicateError = createAction('cityDuplicateError');

export const notFoundCityError = createAction('notFoundCityError');
