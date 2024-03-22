import { Dispatch, SetStateAction, useState } from 'react'
import { fetchCityWeather } from '@services/api'
import { CardData, Location, MainInfo } from '@interfaces'
import { helpers } from '@utils'
import Sync from '@components/svgs/Sync'
import styles from './index.module.css'

interface CardProps {
  data: CardData
  selectedOption: Location | null
  setWeather: Dispatch<SetStateAction<CardData>>
}

const Card: React.FC<CardProps> = ({ data, selectedOption, setWeather }) => {
  const [fetching, setFetching] = useState(false)

  const handleClick = async () => {
    const params = {
      lat: data?.coord?.lat,
      lon: data?.coord?.lon,
    }
    setFetching(true)
    try {
      const weather = await fetchCityWeather(params)
      if (weather.status === 200) {
        const updatedWeather = helpers.updateWeatherData(
          weather?.data,
          data.state || (selectedOption?.state as string)
        )
        localStorage.setItem('weather', JSON.stringify(updatedWeather))
        setWeather(updatedWeather)
      }
    } catch (err: any) {
      console.error(err)
      throw err
    }
    setFetching(false)
  }
  return (
    <div className={styles.card}>
      <p className={styles['card-heading']}>
        <img
          src={`https://flagcdn.com/h20/${data?.country?.toLowerCase()}.png`}
          srcSet={`https://flagcdn.com/h40/${data?.country?.toLowerCase()}.png 2x`}
          alt={data?.country}
        />
        {data?.city}
        {data?.state?.length > 0 ? <>, {data?.state}</> : ''}
        {data?.country?.length > 0 ? <>, {data?.country}</> : ''}
      </p>
      <div className={styles['sub-heading']}>
        <div className={styles['temp-wrapper']}>
          <img
            src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
            alt="weather icon"
            className={styles.icon}
          />

          <p className={styles.font}>
            {data?.temp}
            &deg;F
            <Sync loading={fetching} onClick={handleClick} />
          </p>
        </div>
        <div>
          <p className={styles.description}>
            {helpers.convertToPascalCase(data?.weather[0]?.description)}
          </p>
          <p className={styles.description}>
            Feels like&nbsp;
            {
              <span className={`${styles.font} ${styles.opacity}`}>
                {data?.feels_like}
              </span>
            }
          </p>
        </div>
      </div>
      <div className={styles.footer}>
        {Object.keys(data?.main).map((value: string) => {
          return (
            <div className={styles['footer-content']} key={value}>
              <p>{helpers.convertToPascalCase(value)}</p>
              <p className={`${styles.font} ${styles.opacity}`}>
                {data?.main[value as keyof MainInfo]}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default Card
