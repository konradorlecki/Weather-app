export interface WeatherInterface {
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number
  };
  clouds: {
    all: number
  };
  id: number;
  name: string;
  timezone: number;
  base: string;
  cod: number;
}

export interface MultipleWeatherResponse {
  cnt: number;
  list: WeatherInterface[];
}
