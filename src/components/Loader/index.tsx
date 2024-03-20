import styles from './index.module.css'

interface LoaderProps {
  type?: string
}
const Loader: React.FC<LoaderProps> = ({ type }) => {
  return (
    <span className={type === 'spinner' ? styles.spinner : styles.loader} />
  )
}

export default Loader
