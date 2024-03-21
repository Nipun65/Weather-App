interface LoaderType {
  submitLoader: boolean
  cardLoader: boolean
}

interface Coord {
  lon: number
  lat: number
}

interface Weather {
  id: number
  main: string
  description: string
  icon: string
}

interface MainInfo {
  temp?: number
  feels_like?: number
  temp_min?: number
  temp_max?: number
  pressure: number | string
  humidity: number | string
  visibility?: number | string
  wind?: number | string
}

interface Wind {
  speed: number
  deg: number
}

interface Clouds {
  all: number
}

interface Sys {
  type: number
  id: number
  country: string
  sunrise: number
  sunset: number
}

interface WeatherData {
  coord: Coord
  weather: Weather[]
  base: string
  main: MainInfo
  visibility?: number | string
  wind: Wind
  clouds: Clouds
  dt: number
  sys: Sys
  timezone: number
  id: number
  name: string
  cod: number
}

interface CardData {
  coord: Coord
  country: string
  city: string
  weather: Weather[]
  temp: number
  feels_like: string
  main: MainInfo
}

interface Location {
  name: string
  local_names?: { [key: string]: string }
  lat: number
  lon: number
  country: string
  state: string
}

export type { LoaderType, WeatherData, Coord, CardData, MainInfo, Location }
