import Button from "@/shared/ui/Button/Button"
import LogoText from "@/shared/ui/Logotype/LogoText"
import { ArrowUpRight, LogInIcon } from "lucide-react"

type Props = {
  isLoginButtonsHide?: boolean
}

const Header = ({ isLoginButtonsHide }: Props) => {
  return (
    <header className='absolute flex items-center justify-between px-16 pt-8 w-full max-w-[1519px]'>
      <LogoText />
      {!isLoginButtonsHide && (
        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            color='blue'
            endContent={<LogInIcon />}>
            Войти
          </Button>
          <Button
            variant='fill'
            endContent={<ArrowUpRight />}>
            Зарегистрироваться
          </Button>
        </div>
      )}
    </header>
  )
}

export default Header
