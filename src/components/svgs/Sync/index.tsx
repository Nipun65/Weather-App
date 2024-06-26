import React from 'react'
import styles from './index.module.css'

interface SyncProps {
  loading: boolean
  onClick: () => void
}

const Sync: React.FC<SyncProps> = ({ loading, onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      fill="none"
      className={`${loading ? styles.fetch : styles.fetchstop} ${styles.icon}`}
      onClick={onClick}
    >
      <path
        d="M14.3935 5.37371C18.0253 6.70569 19.8979 10.7522 18.5761 14.4118C17.6363 17.0135 15.335 18.7193 12.778 19.0094M12.778 19.0094L13.8253 17.2553M12.778 19.0094L14.4889 20M9.60651 18.6263C5.97465 17.2943 4.10205 13.2478 5.42394 9.58823C6.36371 6.98651 8.66504 5.28075 11.222 4.99059M11.222 4.99059L10.1747 6.74471M11.222 4.99059L9.51114 4"
        stroke="#464455"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export default Sync
