import FooterIll from "@/shared/svg/FooterIll"
import { MapPinIcon, PhoneIcon } from "lucide-react"

const Footer = () => {
  return (
    <footer className='flex items-end justify-between'>
      <div className='w-[21%]'>
        <FooterIll />
      </div>
      <div className='grid gap-6 min-h-[640px] bg-primary-green rounded-tl-[100px] h-full p-16 pb-6 flex-grow'>
        <h5 className='text-5xl font-bold'>Дополнительная информация о нас</h5>
        <div className='grid gap-4 text-2xl font-semibold bg-primary-green-dark rounded-[48px] px-10 py-8'>
          <div className='grid gap-4'>
            <h6 className='flex items-center justify-start gap-2 text-primary-blue font-bold'>
              <PhoneIcon strokeWidth={2.5} /> Контакты:
            </h6>
            <a
              className='font-uncage'
              href='tel:+74987139201'>
              +7 (498) 713-92-01
            </a>
            <a
              className='font-uncage'
              href='tel:+74954085427'>
              +7 (495) 408-54-27
            </a>
            <a
              className='font-uncage'
              href='tel:+74987446567'>
              +7 (498) 744-65-67
            </a>
            <a
              className='font-uncage'
              href='mailto:dfl@mipt.ru'>
              dfl@mipt.ru
            </a>
          </div>
          <div className='grid gap-4'>
            <h6 className='flex items-center justify-start gap-2 text-primary-blue font-bold'>
              <MapPinIcon strokeWidth={2.5} /> Адреса:
            </h6>
            <a
              href='https://yandex.ru/maps/-/CDtQfOyA'
              target='_blank'>
              г. Долгопрудный, ул. Первомайская, д. 5, корпус Микроэлектроники МФТИ, к. 303.
            </a>
            <a
              href='https://yandex.ru/maps/-/CDtQfW3v'
              target='_blank'>
              г. Долгопрудный, ул. Первомайская, д. 30/8, Центр языковой подготовки и тестирования.
            </a>
          </div>
        </div>
        <div className='flex items-center justify-between text-2xl font-semibold bg-primary-green-dark rounded-[24px] px-10 py-8'>
          <p>©2024 Все права защищены</p>
          <a>Политика конфиденциальности</a>
          <a>Условия пользования</a>
        </div>
        <span className='text-xs font-semibold ml-auto'>v0.0.16a</span>
      </div>
    </footer>
  )
}

export default Footer
