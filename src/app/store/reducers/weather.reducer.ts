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
  }),
  on(WeatherActions.successGetCitiesById, (state, { weather }) => {
    return {
      ...state,
      weather
    }
  }),
  on(WeatherActions.deleteCityWeather, (state, { weatherId }) => {
    const deleteCityWeatherIndex = state.weather.findIndex(weather => weather.id === weatherId);
    const newWeather = [...state.weather];
    newWeather.splice(deleteCityWeatherIndex, 1);

    return {
      ...state,
      weather: newWeather
    }
  })
);

export const weatherReducer = (state: WeatherState | undefined, action: Action) => reducer(state, action);
