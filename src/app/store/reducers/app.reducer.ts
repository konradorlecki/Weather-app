import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../states/app.state';
import { weatherReducer } from './weather.reducer';

export const reducers: ActionReducerMap<AppState> = {
  weatherData: weatherReducer
};

