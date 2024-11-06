import ContentBlock from "@/entities/ContentBlock/ContentBlock"
import ContentBlockCard from "@/entities/ContentBlockCard/ContentBlockCard"
import PatternCard from "@/entities/PatternCard/PatternCard"
import FirstContentBlockIllustration from "@/shared/svg/FirstContentBlockIllustration"
import FourthContentBlockIll1 from "@/shared/svg/FourthContentBlockIll1"
import FourthContentBlockIll2 from "@/shared/svg/FourthContentBlockIll2"
import SecondContentBlockIll1 from "@/shared/svg/SecondContentBlockIll1"
import ThirdContentBlockIll from "@/shared/svg/ThirdContentBlockIll"
import {
  BoxesIcon,
  BriefcaseBusinessIcon,
  ChartNoAxesCombinedIcon,
  GraduationCapIcon,
  HourglassIcon,
  LaptopIcon,
  MedalIcon,
  SchoolIcon,
  ShieldBanIcon,
  TelescopeIcon,
  UsersIcon,
} from "lucide-react"
import Image from "next/image"
import cefr_image from "../../public/cefr.png"

const Contents = () => {
  return (
    <div className='grid gap-4'>
      {/* First content block */}
      <ContentBlock
        backLogoPosition='right'
        color='orange'>
        <FirstContentBlockIllustration className='absolute top-16 right-40' />
        <div className='w-1/2 mb-8'>
          <h3 className='text-5xl font-bold mb-[104px] leading-tight'>
            Первая <br /> национальная <br /> система тестирования
          </h3>
          {/* <p className='text-2xl font-semibold'>
            на основе отечественных технологических и <br /> методологических разработок
          </p> */}
        </div>
        <div className='grid grid-cols-3 gap-14'>
          <ContentBlockCard
            index={0}
            icon={<GraduationCapIcon className='size-12' />}
            text='Мы создали новый стандарт в языковой подготовке для высшего образования'
          />
          <ContentBlockCard
            index={1}
            icon={<ChartNoAxesCombinedIcon className='size-12' />}
            text='Апробировали его и получили результаты и положительные отзывы внешних университетов'
          />
          <ContentBlockCard
            index={2}
            icon={<TelescopeIcon className='size-12' />}
            text='Проводим научные исследования и создаем базу для независимого тестирования по другим иностранным языкам'
          />
        </div>
      </ContentBlock>
      {/* Second content block */}
      <ContentBlock
        backLogoPosition='left'
        color='green'>
        <div className='w-1/2 mb-8'>
          <h3 className='text-5xl font-bold mb-4 leading-tight'>
            Что включает в себя <br /> ИСТ.ОК?
          </h3>
        </div>
        <div className='grid grid-cols-2 gap-4 px-8'>
          <div className='flex items-center justify-center bg-background px-8 py-10 rounded-[48px] rounded-br-md mb-40 text-2xl font-semibold text-center relative'>
            Адаптивный тест на определение уровня владения английским языком в соответствии с
            Общеевропейской шкалой (CEFR) от А1 до С1
            <Image
              className='w-[320px] absolute top-full left-1/2 transform -translate-x-1/2'
              src={cefr_image}
              alt={"cefr"}
            />
            <div className='rounded-[48px] rounded-br-md absolute bg-primary-green-darker w-full h-full -translate-x-8 translate-y-8 -z-10' />
          </div>
          <div className='relative flex items-center justify-center bg-background px-8 py-10 rounded-[48px] rounded-tl-md mt-40 text-2xl font-semibold text-center'>
            Тесты уровней A2, B1, B2 и C1 для подтверждения владения английским языком для общих
            целей, проверяющие все навыки (аудирование, чтение, письмо, говорение) и их интеграцию
            <SecondContentBlockIll1 className='absolute -top-[122%] left-0' />
            <div className='rounded-[48px] rounded-tl-md absolute bg-primary-green-darker w-full h-full translate-x-8 -translate-y-8 -z-10' />
          </div>
        </div>
      </ContentBlock>
      {/* Third content block */}
      <ContentBlock
        className='overflow-hidden'
        size='large'
        backLogoPosition='center'
        color='neutral'>
        <div className='w-1/2 mb-8'>
          <h3 className='text-5xl font-bold mb-4 leading-tight'>Преимущества ИСТ.ОК</h3>
        </div>
        <div className='grid grid-cols-3 gap-2'>
          <PatternCard
            icon={
              <UsersIcon
                className='size-8 stroke-primary-blue'
                strokeWidth={2.5}
              />
            }>
            <h5 className='text-2xl font-semibold text-white mb-4'>Эффективное распределение</h5>
            <p className='text-white text-xl'>
              Адаптивный тест позволяет надежно распределить студентов по группам
            </p>
          </PatternCard>
          <PatternCard
            icon={
              <MedalIcon
                className='size-8'
                strokeWidth={2.5}
              />
            }
            backLogoPosition='right'
            color='green'>
            <h5 className='text-2xl font-semibold text-black mb-4'>Подтверждение достижений</h5>
            <p className='text-black text-xl'>
              Уровневый тест позволяет подтвердить достижения студентов в изучении английского языка
              в конце академическолго года или курса
            </p>
          </PatternCard>
          <PatternCard
            icon={
              <HourglassIcon
                className='size-8 stroke-primary-blue'
                strokeWidth={2.5}
              />
            }>
            <h5 className='text-2xl font-semibold text-white mb-4'>Мгновенные результаты</h5>
            <p className='text-white text-xl'>Быстрое предоствление результатов и сертификатов</p>
          </PatternCard>
          <PatternCard
            icon={
              <BoxesIcon
                className='size-8'
                strokeWidth={2.5}
              />
            }
            backLogoPosition='right'
            color='green'>
            <h5 className='text-2xl font-semibold text-black mb-4'>Индивидуальные задания</h5>
            <p className='text-black text-xl'>
              Вариативность заданий: каждый кандидат получает индивидуальный вариант теста по чтению
              и аудированию
            </p>
          </PatternCard>
          <PatternCard
            icon={
              <LaptopIcon
                className='size-8 stroke-primary-blue'
                strokeWidth={2.5}
              />
            }>
            <h5 className='text-2xl font-semibold text-white mb-4'>Доступность</h5>
            <p className='text-white text-xl'>
              Тест можно пройти на онлайн платформе в любое время и с любого компьютера,
              подключенного к сети Интернет
            </p>
          </PatternCard>
          <PatternCard
            icon={
              <ShieldBanIcon
                className='size-8'
                strokeWidth={2.5}
              />
            }
            backLogoPosition='right'
            color='green'>
            <h5 className='text-2xl font-semibold text-black mb-4'>Защита от подсказок</h5>
            <p className='text-black text-xl'>
              Надежный прокторинг, исключающий использование подсказок
            </p>
          </PatternCard>
        </div>
        <ThirdContentBlockIll className='absolute -bottom-px right-14' />
      </ContentBlock>
      {/* Fourth content block */}
      <ContentBlock
        backLogoPosition='center'
        color='blue'>
        <div className='w-1/2 mb-8'>
          <h3 className='text-white text-5xl font-bold mb-32 leading-tight'>
            ИСТ.ОК <br /> предназначен:
          </h3>
        </div>
        <div className=' grid grid-cols-2 gap-4 mb-16'>
          <div className='w-full min-h-44 px-8 py-6 bg-background rounded-[48px] relative'>
            <FourthContentBlockIll1 className='absolute transform -translate-y-[112%] right-6' />
            <h5 className='w-max flex items-center justify-center gap-1.5 font-semibold text-primary-blue border-2 border-primary-blue rounded-full p-2 mb-4'>
              Для вузов
              <SchoolIcon />
            </h5>
            <p className='text-xl font-medium'>
              При распределении студентов на программы и для определения уровня языковых компетенций
              выпускников бакалавриата, магистратуры и аспирантуры
            </p>
          </div>
          <div className='w-full min-h-44 px-8 py-6 bg-background rounded-[48px] relative'>
            <FourthContentBlockIll2 className='absolute transform -translate-y-[110%] right-6' />
            <h5 className='w-max flex items-center justify-center gap-1.5 font-semibold text-primary-blue border-2 border-primary-blue rounded-full p-2 mb-4'>
              Для работодателей
              <BriefcaseBusinessIcon />
            </h5>
            <p className='text-xl font-medium'>
              При определении или подтверждении уровня владения английским языком сотрудников,
              работающих в различных сферах профессиональной деятельности
            </p>
          </div>
        </div>
      </ContentBlock>
    </div>
  )
}

export default Contents
