import PatternCard from "@/entities/PatternCard/PatternCard"
import CEFRIcon from "@/shared/svg/CEFRIcon"
import { AlbumIcon, BrainCogIcon, GlobeIcon, MedalIcon } from "lucide-react"

const DomFeatures = () => {
  return (
    <div className='pt-16 px-40 relative'>
      <CEFRIcon className='absolute right-0 top-0 -z-10' />
      <h4 className='text-5xl font-bold mb-8'>
        Независимое тестирование языковых компетенций по стандарту CEFR
      </h4>
      <div className='grid grid-cols-4 gap-4 w-full'>
        <PatternCard
          backLogoPosition='center'
          className='h-full px-4'
          color='orange'
          icon={
            <AlbumIcon
              strokeWidth={2.5}
              className='size-8'
            />
          }>
          <p className='text-2xl font-semibold text-center'>
            Первый российский тест по английскому языку с технологиями DeepPavlov, разработанными в
            МФТИ
          </p>
        </PatternCard>
        <PatternCard
          backLogoPosition='left'
          className='h-full px-4'
          color='orange'
          icon={
            <BrainCogIcon
              strokeWidth={2.5}
              className='size-8'
            />
          }>
          <p className='text-2xl font-semibold text-center'>
            Тестовая система построена на нейросетевой лингвистической платформе
          </p>
        </PatternCard>
        <PatternCard
          backLogoPosition='right'
          className='h-full px-4'
          color='orange'
          icon={
            <MedalIcon
              strokeWidth={2.5}
              className='size-8'
            />
          }>
          <p className='text-2xl font-semibold text-center'>
            Качество оценки письменных работ подтверждено экспертами с международным опытом
          </p>
        </PatternCard>
        <PatternCard
          backLogoPosition='center'
          className='h-full px-4'
          color='orange'
          icon={
            <GlobeIcon
              strokeWidth={2.5}
              className='size-8'
            />
          }>
          <p className='text-2xl font-semibold text-center'>
            Независимая система для оценки уровня владения русским языком как иностранным (РКИ)
          </p>
        </PatternCard>
      </div>
    </div>
  )
}

export default DomFeatures
