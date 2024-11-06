import { cn } from "@/shared/lib/utils"
import { Pattern } from "@/shared/svg/Pattern"
import { ReactNode } from "react"

type Props = {
  children?: ReactNode
  color?: "blue" | "green" | "orange" | "neutral"
  backLogoPosition?: "left" | "right" | "center"
  className?: string
  icon?: React.ReactNode
}

const positionVariants = {
  left: "left-0",
  right: "right-0",
  center: "left-1/2 transform -translate-x-1/2",
}

const colorVariants = {
  blue: "bg-primary-blue",
  green: "bg-primary-green",
  orange: "bg-primary-orange",
  neutral: "bg-primary-neutral",
}

const PatternCard = ({
  backLogoPosition = "left",
  children,
  className,
  color = "blue",
  icon,
}: Props) => {
  return (
    <div
      className={cn(
        "p-6 rounded-[48px] overflow-hidden relative h-[298px]",
        colorVariants[color],
        className
      )}>
      <Pattern
        fill={`hsl(var(--primary-${color}-darker))`}
        className={cn("absolute h-[150%] top-0", positionVariants[backLogoPosition])}
      />
      <div className='relative z-10'>
        <div className='flex items-center justify-center size-16 rounded-full bg-background mb-4'>
          {icon}
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default PatternCard
