const updateWeatherData = (data: any) => {
  return {
    coord: data?.coord,
    country: data?.sys?.country,
    city: data?.name,
    weather: data?.weather,
    temp: data?.main?.temp,
    main: {
      humidity: `${data?.main?.humidity}%`,
      pressure: `${data?.main?.pressure}hPa`,
      visibility: `${data?.visibility}m`,
      feels_like: `${data?.main?.feels_like}°`,
      wind: `${data?.wind?.speed}mph`,
    },
  }
}
const underscoreToPascalCase = (value: string) => {
  return value
    .split('_')
    .map((wor) => wor[0].toUpperCase() + wor.slice(1))
    .join(' ')
}

export { updateWeatherData, underscoreToPascalCase }
