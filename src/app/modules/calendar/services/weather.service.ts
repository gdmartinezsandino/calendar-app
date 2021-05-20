import { Injectable } from '@angular/core';

@Injectable()
export class WeatherService {

  getWeatherInformation(city: string) {
    return {
      city,
      weatherInfo: 'here',
    };
  }
}
