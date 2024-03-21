import styles from './index.module.css'

interface LoaderProps {
  className: string
}
const Loader: React.FC<LoaderProps> = ({ className }) => {
  return <span className={`${styles.loader} ${className}`} />
}

export default Loader
