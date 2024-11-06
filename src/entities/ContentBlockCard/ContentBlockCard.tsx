import React from "react"

type Props = {
  icon: React.ReactNode
  text: React.ReactNode
  index?: number
}

const ContentBlockCard = ({ icon, text, index }: Props) => {
  return (
    <div className='flex flex-col items-center justify-start'>
      <div
        style={{
          boxShadow: `${index === 0 ? "-12px -12px" : index === 1 ? "0px -12px" : "12px -12px"} 0 0 hsl(var(--primary-orange-darker))`,
        }}
        className='flex items-center justify-center size-24 rounded-full bg-background mb-4'>
        {icon}
      </div>
      <p className='text-xl font-semibold text-center'>{text}</p>
    </div>
  )
}

export default ContentBlockCard
