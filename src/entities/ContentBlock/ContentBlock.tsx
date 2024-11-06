import { cn } from "@/shared/lib/utils"
import { Pattern } from "@/shared/svg/Pattern"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
  className?: string
  color?: "blue" | "green" | "orange" | "neutral"
  backLogoPosition?: "left" | "right" | "center"
  size?: "small" | "medium" | "large"
}

const baseStyles = "w-full rounded-[114px] relative"

const positionVariants = {
  left: "left-0",
  right: "right-0",
  center: "left-1/2 transform -translate-x-1/2",
}

const sizeVariants = {
  small: "h-max",
  medium: "h-[720px]",
  large: "h-max",
}

const colorVariants = {
  blue: "bg-primary-blue",
  green: "bg-primary-green",
  orange: "bg-primary-orange",
  neutral: "bg-primary-neutral",
}

const ContentBlock = ({
  children,
  className,
  color = "orange",
  backLogoPosition = "left",
  size = "small",
}: Props) => {
  return (
    <div className={cn(baseStyles, colorVariants[color], sizeVariants[size], className)}>
      <Pattern
        className={cn("absolute h-full w-max", positionVariants[backLogoPosition])}
        fill={`hsl(var(--primary-${color}-dark))`}
      />
      <div className='relative px-40 py-16 z-10'>{children}</div>
    </div>
  )
}

export default ContentBlock
