import { helpers } from '../../utils'
import styles from './index.module.css'

interface CardProps {
  data: any
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
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
            alt="weather icon"
            className={styles.icon}
          />

          <p>
            {data?.temp}
            &deg;F
          </p>
        </span>
        <p className={styles.description}>
          {helpers.underscoreToPascalCase(data?.weather[0]?.description)}
        </p>
      </div>
      <div className={styles.footer}>
        {Object.keys(data?.main).map((value: string) => {
          return (
            <div className={styles['footer-content']} key={value}>
              <p>{helpers.underscoreToPascalCase(value)}</p>
              <p>{data?.main[value]}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default Card
