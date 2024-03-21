import axios from 'axios'
import { Coord } from '@interfaces'

const API_URL = import.meta.env.VITE_OPENWEATHER_API_URL
const API_KEY = import.meta.env.VITE_API_KEY

const fetchCities = async (value: string) => {
  try {
    const cities = await axios.get(API_URL, {
      params: {
        q: value,
        limit: 5,
        appid: API_KEY,
      },
    })
    return cities
  } catch (err) {
    throw err
  }
}

const fetchCityWeather = async (params: Coord) => {
  try {
    const WEATHER_DATA_URl = 'https://api.openweathermap.org/data/2.5/weather'

    const data = await axios.get(WEATHER_DATA_URl, {
      params: { ...params, appid: API_KEY, units: 'Imperial' },
    })
    return data
  } catch (err) {
    throw err
  }
}
export { fetchCities, fetchCityWeather }
