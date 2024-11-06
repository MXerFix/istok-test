import { cn } from "@/shared/lib/utils"
import React, { ButtonHTMLAttributes, ReactNode } from "react"

// Типы цветов и вариантов
type Variant = "outline" | "fill" | "ghost"
type Color = "blue" | "green" | "orange"

// Интерфейс для пропсов Button
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  startContent?: ReactNode
  endContent?: ReactNode
  variant?: Variant
  color?: Color
  className?: string
}

// Стили для каждого цвета и варианта
const baseStyles =
  "flex items-center border-2 border-transparent font-semibold justify-center gap-2 px-4 py-2.5 rounded-full transition duration-150 ease-in-out"

const variantStyles: Record<Color, Record<Variant, string>> = {
  blue: {
    outline:
      "border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white",
    fill: "bg-primary-blue text-white hover:bg-primary-blue-dark",
    ghost: "bg-transparent text-primary-blue hover:bg-primary-blue-darker",
  },
  green: {
    outline:
      "border border-primary-green text-primary-green hover:bg-primary-green hover:text-white",
    fill: "bg-primary-green text-white hover:bg-primary-green-dark",
    ghost: "bg-transparent text-primary-green hover:bg-primary-green-darker",
  },
  orange: {
    outline:
      "border border-primary-orange text-primary-orange hover:bg-primary-orange hover:text-white",
    fill: "bg-primary-orange text-white hover:bg-primary-orange-dark",
    ghost: "bg-transparent text-primary-orange hover:bg-primary-orange-darker",
  },
}

const Button: React.FC<ButtonProps> = ({
  startContent,
  endContent,
  variant = "fill",
  color = "blue", // Цвет по умолчанию — синий
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(baseStyles, variantStyles[color][variant], className)}
      {...props}>
      {startContent && <span className='flex items-center'>{startContent}</span>}
      <span>{children}</span>
      {endContent && <span className='flex items-center'>{endContent}</span>}
    </button>
  )
}

export default Button
