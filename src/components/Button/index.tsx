import React from 'react'
import styles from './index.module.css'

interface ButtonProps {
  className?: string
  children: React.ReactNode
  onClick: (e: React.MouseEvent) => void
  disabled?: boolean
}
const Button: React.FC<ButtonProps> = ({
  className,
  children,
  onClick,
  disabled,
}) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
export default Button
