import { Action, createReducer, on } from '@ngrx/store';
import { WeatherState } from '../states/weather.state';
import { WeatherActions } from '../actions';

export const initialWeatherState: WeatherState = {
  weather: [],
};

const reducer = createReducer(
  initialWeatherState,
  on(WeatherActions.successGetCityByName, (state, { weather }) => {
    const updatedWeather = [...state.weather];
    updatedWeather.push(weather);

    return {
      ...state,
      weather: updatedWeather
    };
  })
);

export const weatherReducer = (state: WeatherState | undefined, action: Action) => reducer(state, action);
