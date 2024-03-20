import styles from './index.module.css'

interface InputProps {
  value?: string
  className?: string
  type?: string
  placeholder?: string
  onChange?: (e: React.ChangeEvent) => void
}

const Input: React.FC<InputProps> = ({
  value,
  className,
  type,
  placeholder,
  onChange,
}) => {
  return (
    <input
      value={value}
      className={`${styles.input} ${className}`}
      type={type || 'text'}
      placeholder={placeholder}
      onChange={onChange}
    />
  )
}

export default Input
