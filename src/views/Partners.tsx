import ISTOKIcon from "@/shared/svg/ISTOKIcon"
import Image from "next/image"
import logo_dfl from "../../public/LogotypeDFL.png"
import logo_deeppavlov from "../../public/LogotypeDeepPavlov.png"
import logo_nclc from "../../public/LogotypeNCLC.png"
import logo_nti from "../../public/LogotypeNTI.png"

const images = [logo_nclc, logo_dfl, logo_deeppavlov, logo_nti]

const Partners = () => {
  return (
    <div className='pb-40 mt-32'>
      <div className='max-w-[1519px] mx-auto px-40 relative pt-2'>
        <ISTOKIcon className='absolute left-0 top-0 -z-10' />
        <h4 className='text-5xl font-bold mb-20'>Партнеры:</h4>
      </div>
      <div className='border-2 border-black px-40 w-max min-w-[110vw] h-36 bg-background border-b-8 border-primary-neutral transform -rotate-6  -translate-x-[6vw] flex items-center justify-between'>
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt=''
            className='w-max h-[104px] object-contain'
          />
        ))}
      </div>
    </div>
  )
}

export default Partners
