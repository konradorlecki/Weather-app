import { AppState } from '../states/app.state';

export const selectWeatherState = (state: AppState) => state.weatherData;
