import HeroCard from "@/entities/HeroCard/HeroCard"
import { cn } from "@/shared/lib/utils"
import HeroIllustration from "@/shared/svg/HeroIllustration"
import { Pattern } from "@/shared/svg/Pattern"
import Link from "next/link"

const Hero = () => {
  return (
    <div className='min-h-screen pt-52 relative'>
      <Pattern className='absolute top-0 left-28 -z-10' />
      <div className='px-40 w-full grid grid-cols-2'>
        <div className=''>
          <h2 className='text-4xl leading-none font-bold flex items-start justify-start flex-wrap gap-2'>
            {["Интеллектуальная", "система", "тестирования", "общеязыковых", "компетенций"].map(
              (word, index) => (
                <p
                  key={index}
                  className={cn("first-letter:text-primary-blue", !index && "w-full")}>
                  {word}
                </p>
              )
            )}
          </h2>
          <h1 className='text-[180px] font-semibold leading-[0] mt-16 mb-24'>
            <span className='text-primary-blue'>ист</span>
            <span className='text-primary-orange'>ок</span>
          </h1>
          <p className='font-semibold text-2xl mb-10'>
            Основана на базе отечественных <br /> технологических и методологических разработок
          </p>

          <Link href={"/test"} className='relative text-2xl font-semibold px-6 py-4'>
            Пройти демо-тест
            <span className='absolute -z-10 -top-4 -right-4 size-16 rounded-full bg-primary-orange block' />
          </Link>
        </div>
        <div className='flex items-center justify-end'>
          <HeroIllustration />
        </div>
        <div className='col-span-2 flex items-center justify-end gap-3'>
          <HeroCard
            number={5}
            text='вузов партнеров апробировавших тестирование'
          />
          <HeroCard
            number={"10000+"}
            text={
              <>
                человек <br /> уже прошли тестирование
              </>
            }
          />
          <HeroCard
            number={5}
            text='внешних сертифицированных экспертов'
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
