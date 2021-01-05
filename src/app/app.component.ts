import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from './store/states/app.state';
import { WeatherActions } from './store/actions';
import { selectWeatherState } from './store/selectors/weather.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
}
