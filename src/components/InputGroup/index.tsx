import { Dispatch, SetStateAction, useState } from 'react'
import { fetchCities, fetchCityWeather } from '@services/api'
import { CardData, LoaderType, Location } from '@interfaces'
import { helpers } from '@utils'
import Button from '@components/Button'
import Input from '@components/Input'
import loader from '@assets/loader.svg'
import styles from './index.module.css'

interface InputGroupProps {
  setLoading: Dispatch<SetStateAction<LoaderType>>
  loading: LoaderType
  setWeather: Dispatch<SetStateAction<CardData>>
  setSelectedOption: Dispatch<SetStateAction<Location | null>>
}
const InputGroup: React.FC<InputGroupProps> = ({
  loading,
  setLoading,
  setWeather,
  setSelectedOption,
}) => {
  const [value, setValue] = useState('')
  const [cities, setCities] = useState<Location[] | null>(null)
  const [error, setError] = useState({ message: '', hasError: false })

  const handleChange = (e: React.ChangeEvent) => {
    setValue((e.target as HTMLInputElement).value)
    if (cities && cities?.length > 0) setCities(null)
    if (error.hasError) {
      setError({ hasError: false, message: '' })
    }
  }

  const handleButton = async () => {
    if (value) {
      setLoading({ submitLoader: true, cardLoader: false })
      setError({ hasError: false, message: '' })
      try {
        const data = await fetchCities(value)
        if (data.status === 200) {
          if (data?.data?.length === 0) {
            setError({ hasError: true, message: 'No City Found' })
          } else {
            setCities(data?.data)
          }
        }
      } catch (err: any) {
        console.error(err)
        setError({ hasError: true, message: err?.response?.data?.message })
      }
      setLoading({ submitLoader: false, cardLoader: false })
    } else {
      setError({ hasError: true, message: 'This is required' })
    }
  }

  const handleSelection = async (city: Location) => {
    setLoading({ submitLoader: false, cardLoader: true })
    setSelectedOption(city)
    const params = {
      lat: city.lat,
      lon: city.lon,
    }
    setCities([])
    try {
      const data = await fetchCityWeather(params)
      if (data.status === 200) {
        const updatedWeather = helpers.updateWeatherData(data.data, city?.state)
        localStorage.setItem('weather', JSON.stringify(updatedWeather))
        setWeather(updatedWeather)
      }
    } catch (err: any) {
      console.error(err)
      setError({ hasError: true, message: err?.response?.data?.message })
    }
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
            {cities.map((city: Location, index: number) => (
              <li
                className="option"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSelection(city)
                  }
                }}
                onClick={() => handleSelection(city)}
                key={`${city.name}-${city.lat}-${index}`}
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
