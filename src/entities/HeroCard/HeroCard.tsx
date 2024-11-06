import React, { ReactNode } from "react"

interface HeroCardProps {
  number: ReactNode
  text: ReactNode
}

const HeroCard: React.FC<HeroCardProps> = ({ number, text }) => (
  <div className='p-6 w-60 h-44 rounded-full border border-primary-blue flex flex-col items-center justify-start'>
    <span className='block mb-2 text-[40px] text-primary-blue font-uncage font-medium leading-none'>
      {number}
    </span>
    <p className='w-full text-center text-xl font-medium'>{text}</p>
  </div>
)

export default HeroCard
