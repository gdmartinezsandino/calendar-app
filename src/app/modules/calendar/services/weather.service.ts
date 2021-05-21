import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable()
export class WeatherService {
  constructor(private http: HttpClient) { }

  getWeatherInformation(city: string) {
    return {
      city,
      weatherInfo: 'here',
    };
  }
}
