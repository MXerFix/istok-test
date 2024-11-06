import React from "react"

type Props = {
  icon: React.ReactNode
  text: React.ReactNode
}

const ContentBlockCard = ({ icon, text }: Props) => {
  return (
    <div className='flex flex-col items-center justify-start'>
      <div className='flex items-center justify-center size-24 rounded-full bg-background mb-4'>
        {icon}
      </div>
      <p className='text-xl font-semibold text-center'>{text}</p>
    </div>
  )
}

export default ContentBlockCard
