import axios from 'axios'
import { Coord } from '@interfaces'

const API_KEY = import.meta.env.VITE_API_KEY
const API_URL = import.meta.env.VITE_API_URL

const fetchCities = async (value: string) => {
  const url = `${API_URL}/geo/1.0/direct`
  try {
    const cities = await axios.get(url, {
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
    const url = `${API_URL}/data/2.5/weather`
    const data = await axios.get(url, {
      params: { ...params, appid: API_KEY, units: 'Imperial' },
    })
    return data
  } catch (err) {
    throw err
  }
}
export { fetchCities, fetchCityWeather }
