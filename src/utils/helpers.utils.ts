import { CardData, WeatherData } from '../interface'

const updateWeatherData = (data: WeatherData) => {
  const newData: CardData = {
    coord: data?.coord,
    country: data?.sys?.country,
    city: data?.name,
    weather: data?.weather,
    temp: data.main.temp as number,
    feels_like: `${data?.main?.feels_like}°`,
    main: {
      humidity: `${data?.main?.humidity}%`,
      pressure: `${data?.main?.pressure}hPa`,
      visibility: `${data?.visibility}m`,
      wind: `${data?.wind?.speed}mph`,
    },
  }
  return newData
}
const convertToPascalCase = (value: string) => {
  return value
    .split('_')
    .map((wor) => wor[0].toUpperCase() + wor.slice(1))
    .join(' ')
}

export { updateWeatherData, convertToPascalCase }
