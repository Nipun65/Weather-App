import { useState } from 'react'

import './App.css'
import Input from './components/Input'
import Button from './components/Button'
import { fetchCities, fetchCityWeather } from './services/api'
import Card from './components/Card'
import { helpers } from './utils'
import Loader from './components/Loader'

function App() {
  const [value, setValue] = useState('')
  const [cities, setCities] = useState<any>(null)
  const [weather, setWeather] = useState<any>(
    JSON.parse(localStorage.getItem('weather') as string) || null
  )
  const [loading, setLoading] = useState({
    submitLoader: false,
    cardLoader: false,
  })
  const [selectedCountry, setSelectedCountry] = useState<any>({
    city: '',
    country: '',
    state: '',
    lat: '',
    lon: '',
  })
  const [error, setError] = useState({ message: '', hasError: false })

  const handleChange = (e: React.ChangeEvent) => {
    setValue((e.target as HTMLInputElement).value)
    setCities(null)
    if (error.hasError) {
      setError({ hasError: false, message: '' })
    }
  }

  const handleButton = async () => {
    if (value) {
      setLoading({ submitLoader: true, cardLoader: false })
      const cities = await fetchCities(value)
      if (cities.length === 0) {
        setError({ hasError: true, message: 'No City Found' })
      }
      setCities(cities)
      setLoading({ submitLoader: false, cardLoader: false })
    }
  }

  const handleSelection = async (city: any) => {
    setSelectedCountry({
      city: city.name,
      country: city.country,
      state: city.state,
      lat: city.lat,
      lon: city.lon,
    })
    setLoading({ submitLoader: false, cardLoader: true })

    const params = {
      lat: city.lat,
      lon: city.lon,
    }
    const data = await fetchCityWeather(params)
    const updatedWeather = helpers.updateWeatherData(data)
    localStorage.setItem('weather', JSON.stringify(updatedWeather))
    setWeather(updatedWeather)
    setSelectedCountry(null)
    setCities([])
    setLoading({ submitLoader: false, cardLoader: false })
  }

  return (
    <div className="main">
      <div className="input-wrapper">
        <div className="wrapper">
          <div style={{ width: '100%', position: 'relative' }}>
            <Input
              onChange={handleChange}
              value={value}
              placeholder="Enter City Name"
            />
            {error.hasError && (
              <p style={{ textAlign: 'left', color: 'red', marginLeft: '2px' }}>
                {error.message}
              </p>
            )}
            {cities &&
              (selectedCountry?.city?.length === 0 || !selectedCountry) && (
                <ul className="option-wrapper">
                  {cities.map((city: any) => (
                    <li
                      className="option"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSelection(city)
                        }
                      }}
                      onClick={() => handleSelection(city)}
                      key={city.value}
                    >
                      <img
                        src={`https://flagcdn.com/h120/${city?.country.toLowerCase()}.png`}
                        width="20"
                        alt={city.country}
                      />
                      {city.name}, {city.country}
                    </li>
                  ))}
                </ul>
              )}
          </div>
        </div>
        <Button
          onClick={handleButton}
          className="submit-btn"
          disabled={loading.submitLoader}
        >
          {loading.submitLoader && <Loader type="spinner"></Loader>}
          Submit
        </Button>
      </div>
      {loading.cardLoader ? (
        <Loader />
      ) : (
        weather && <Card data={weather}></Card>
      )}
    </div>
  )
}

export default App
