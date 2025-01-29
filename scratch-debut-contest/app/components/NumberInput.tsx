import type React from "react"
import { Input } from "@/components/ui/input"

// interface NumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
interface NumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {

  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}

export function NumberInput({ value, onChange, min, max, ...props }: NumberInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number.parseInt(e.target.value, 10)
    if (isNaN(newValue)) {
      onChange(min || 0)
    } else if (min !== undefined && newValue < min) {
      onChange(min)
    } else if (max !== undefined && newValue > max) {
      onChange(max)
    } else {
      onChange(newValue)
    }
  }

  const handleBlur = () => {
    if (value < (min || 0)) {
      onChange(min || 0)
    } else if (max !== undefined && value > max) {
      onChange(max)
    }
  }

  return (
    <Input type="number" value={value} onChange={handleChange} onBlur={handleBlur} min={min} max={max} {...props} />
  )
}

