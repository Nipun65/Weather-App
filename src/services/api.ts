import axios from 'axios'
import { Coord } from '@interfaces'

const API_URL = import.meta.env.VITE_OPENWEATHER_API_URL
const API_KEY = import.meta.env.VITE_API_KEY

const fetchCities = async (value: string) => {
  const cities = await axios.get(API_URL, {
    params: {
      q: value,
      limit: 5,
      appid: API_KEY,
    },
  })
  return cities.data
}

const fetchCityWeather = async (params: Coord) => {
  const WEATHER_DATA_URl = 'https://api.openweathermap.org/data/2.5/weather'
  const weather = await axios.get(WEATHER_DATA_URl, {
    params: { ...params, appid: API_KEY, units: 'Imperial' },
  })
  return weather.data
}
export { fetchCities, fetchCityWeather }
