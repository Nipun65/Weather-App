import { CardData, MainInfo } from '../../interface'
import { helpers } from '../../utils'
import styles from './index.module.css'

interface CardProps {
  data: CardData
}

const Card: React.FC<CardProps> = ({ data }) => {
  return (
    <div className={styles.card}>
      <p className={styles['card-heading']}>
        <img
          src={`https://flagcdn.com/h20/${data?.country?.toLowerCase()}.png`}
          srcSet={`https://flagcdn.com/h40/${data?.country?.toLowerCase()}.png 2x`}
          alt={data?.country}
        />
        {data?.city}, {data?.country}
      </p>
      <div className={styles['sub-heading']}>
        <div className={styles.temp_wrapper}>
          <img
            src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
            alt="weather icon"
            className={styles.icon}
          />

          <p className={styles.font}>
            {data?.temp}
            &deg;F
          </p>
        </div>
        <div>
          <p className={styles.description}>
            {helpers.convertToPascalCase(data?.weather[0]?.description)}
          </p>
          <p className={styles.description}>
            Feels like&nbsp;
            {<span className={styles.font}>{data?.feels_like}</span>}
          </p>
        </div>
      </div>
      <div className={styles.footer}>
        {Object.keys(data?.main).map((value: string) => {
          return (
            <div className={styles['footer-content']} key={value}>
              <p>{helpers.convertToPascalCase(value)}</p>
              <p className={styles.font}>
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
