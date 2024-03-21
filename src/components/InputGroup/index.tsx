import { Dispatch, SetStateAction, useState } from 'react'
import { fetchCities, fetchCityWeather } from '../../services/api'
import { CardData, LoaderType, Location } from '../../interface'
import { helpers } from '../../utils'
import Button from '../Button'
import Input from '../Input'
import loader from '../../assets/loader.svg'
import styles from './index.module.css'

interface InputGroupProps {
  setLoading: Dispatch<SetStateAction<LoaderType>>
  loading: LoaderType
  setWeather: Dispatch<SetStateAction<CardData>>
}
const InputGroup: React.FC<InputGroupProps> = ({
  loading,
  setLoading,
  setWeather,
}) => {
  const [value, setValue] = useState('')
  const [cities, setCities] = useState<Location[] | null>(null)
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
    } else {
      setError({ hasError: true, message: 'This is required' })
    }
  }

  const handleSelection = async (city: Location) => {
    setLoading({ submitLoader: false, cardLoader: true })

    const params = {
      lat: city.lat,
      lon: city.lon,
    }
    setCities([])
    const data = await fetchCityWeather(params)
    const updatedWeather = helpers.updateWeatherData(data)
    localStorage.setItem('weather', JSON.stringify(updatedWeather))
    setWeather(updatedWeather)
    setLoading({ submitLoader: false, cardLoader: false })
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <Input
          onChange={handleChange}
          value={value}
          placeholder="Enter City Name"
          className={styles.input}
          style={{
            borderBottomRightRadius:
              cities && cities?.length > 0 ? '0' : '0.4rem',
            borderBottomLeftRadius:
              cities && cities?.length > 0 ? '0' : '0.4rem',
          }}
        />

        <Button
          onClick={handleButton}
          className="submit-btn"
          disabled={loading.submitLoader}
        >
          {loading.submitLoader && (
            <img className={styles.loader} src={loader} alt="loader" />
          )}
          Submit
        </Button>
        {error.hasError && <p className={styles.error}>{error.message}</p>}

        {cities && cities?.length > 0 && (
          <ul className="option-wrapper">
            {cities.map((city: Location) => (
              <li
                className="option"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSelection(city)
                  }
                }}
                onClick={() => handleSelection(city)}
                key={city.lat}
              >
                <img
                  src={`https://flagcdn.com/h80/${city?.country.toLowerCase()}.png`}
                  width="30"
                  alt={city.country}
                  className={styles.flag}
                />
                {city.name}, {city.country}
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  )
}
export default InputGroup