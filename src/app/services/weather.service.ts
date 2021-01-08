import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherInterface } from '../models/weatherInterface';
import { API } from '../constants/api';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private http: HttpClient,
  ) { }

  getCityByName(cityName: string): Observable<WeatherInterface> {
    return this.http.get<WeatherInterface>(`${API.WEATHER.DEFAULT}${API.WEATHER.PARTS.WEATHER}q=${cityName}&appid=${environment.weatherApiKey}`);
  }

  getCitiesById(citiesId: string[]): Observable<WeatherInterface[]> {
    return this.http.get<WeatherInterface[]>(`${API.WEATHER.DEFAULT}${API.WEATHER.PARTS.GROUP}id=${[...citiesId]}&appid=${environment.weatherApiKey}`);
  }
}
