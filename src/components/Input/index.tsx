import styles from './index.module.css'

interface InputProps {
  value?: string
  className?: string
  type?: string
  placeholder?: string
  style?: React.CSSProperties
  onChange?: (e: React.ChangeEvent) => void
}

const Input: React.FC<InputProps> = ({
  value,
  className,
  type,
  placeholder,
  onChange,
  style,
}) => {
  return (
    <input
      value={value}
      className={`${styles.input} ${className}`}
      type={type || 'text'}
      placeholder={placeholder}
      onChange={onChange}
      style={style}
    />
  )
}

export default Input
