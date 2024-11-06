"use client"
import { AdaptiveTest, Task } from "@/features/test/AdaptiveTest"
// import { useRouter } from "next/navigation"
import { cn } from "@/shared/lib/utils"
import { Pattern } from "@/shared/svg/Pattern"
import TestEndIll from "@/shared/svg/TestEndIll"
import TestStartPageIll from "@/shared/svg/TestStartPageIll"
import Header from "@/widgets/Header/Header"
import { Button } from "@headlessui/react"
import { ArrowUpRightIcon, PlayIcon } from "lucide-react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useTimer } from "react-timer-hook"
import questions from "../../../test.json"

const Question = dynamic(() => import("../../widgets/Question/Question"), {
  ssr: false,
})

const TestPage = () => {
  const router = useRouter()
  const [isStartPage, setIsStartPage] = useState(true)
  const [test] = useState(new AdaptiveTest(questions as Task[])) // Создание экземпляра теста
  const [currentStep, setCurrentStep] = useState(0) // Начинаем с первого вопроса
  const [currentQuestion, setCurrentQuestion] = useState(test.getRandomQuestion(currentStep))
  const [currentPart, setCurrentPart] = useState(1)
  const [finalResults, setFinalResults] = useState<number[]>([])
  const [intResults, setIntResults] = useState<number[]>([])
  const { seconds, minutes, start, pause } = useTimer({
    expiryTimestamp: new Date(Date.now() + 1000 * 60 * 40),
    onExpire: () => {
      alert("Время вышло. Попробуйте снова.")
      router.push("/")
    },
    autoStart: false,
  })

  useEffect(() => {
    if (!isStartPage) {
      start()
    }
  }, [isStartPage])

  // Обновляем текущий вопрос при изменении шага
  useEffect(() => {
    setCurrentQuestion(test.getRandomQuestion(currentStep))
  }, [currentStep])

  // console.log(finalResults)

  const handleAnswer = (correctPercentage: number) => {
    if (currentQuestion?.parts && currentQuestion.parts.length > 1) {
      if (currentPart < currentQuestion.parts.length) {
        setIntResults([...intResults, correctPercentage])
        setCurrentPart((prevPart) => prevPart + 1)
        return
      }
    }
    const result =
      (intResults.reduce((acc, intResult) => acc + intResult, 0) + correctPercentage) /
      (intResults.length + 1)
    setFinalResults([...finalResults, result])
    test.handleAnswer(result) // Обработка ответа
    setIntResults([])
    setCurrentPart(1)
    setCurrentStep((prevStep) => prevStep + 1)
  }

  useEffect(() => {
    pause()
  }, [test.isTestComplete()])

  // console.log()

  // Если текущего вопроса больше нет, значит, тест завершен
  if (!currentQuestion || test.isTestComplete()) {
    // router.push("/test/results") // Переход на страницу результатов
    const finalPercentage =
      finalResults.reduce((acc, result) => acc + result, 0) / finalResults.length
    console.log("no questions")
    return (
      <div className='w-full h-screen grid grid-cols-2 items-center justify-center gap-4 pl-24 pr-8'>
        <div className='bg-primary-green rounded-[48px] px-14 pt-32 pb-20 relative overflow-hidden'>
          <Pattern
            fill='hsl(var(--primary-green-dark))'
            className='absolute top-0'
          />
          <div className='relative flex flex-col items-center justify-start'>
            <h3 className='text-5xl font-bold mb-8 text-center'>Вы успешно прошли тестирование!</h3>
            <p className='mb-4 text-2xl font-bold'>Ваш уровень:</p>
            <p className='mb-4 text-[64px] font-bold'>{test.getResults(finalPercentage)}</p>
            <p className='text-xl font-medium mb-4 text-center'>
              Спасибо за участие. Желаем успехов в дальнейшем изучении иностранного языка!
            </p>
            <Link
              className='text-xl w-max font-semibold bg-background rounded-full px-6 py-4 flex items-center justify-center gap-2'
              href={"/"}>
              Перейти на главную
              <ArrowUpRightIcon strokeWidth={2.5} />
            </Link>
          </div>
          {/* <p className='text-primary-green-dark font-uncage'>
            {Math.round(finalPercentage * 100)}%
          </p> */}
        </div>
        <TestEndIll className='w-full' />
      </div>
    )
  }

  const baseTasks = questions.filter((q) => q.variant === 1 && q.level === "B1")

  return (
    <div className='bg-background min-h-screen'>
      <Header isLoginButtonsHide />
      <div
        className={cn(
          "z-30 fixed top-12 right-20 bg-background border-2 border-foreground p-2 flex items-center justify-center rounded-xl font-mono font-semibold text-2xl",
          minutes < 5 && "text-red-600"
        )}>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
      {isStartPage ? (
        <div className='fixed top-0 left-0 w-full h-full bg-background z-20'>
          <div className='max-w-[1519px] w-full h-full mx-auto px-28 grid grid-cols-2 items-center justify-center relative'>
            <div className='px-14 py-16 bg-primary-green rounded-[32px] relative overflow-hidden'>
              <Pattern
                className='absolute top-0 right-0'
                fill='hsl(var(--primary-green-dark))'
              />
              <div className='relative'>
                <h1 className='text-5xl font-bold mb-8 leading-tight'>
                  Узнайте свой уровень владения языком!
                </h1>
                <h2 className='text-2xl font-bold mb-4'>Тестирование по английскому языку</h2>
                <p className='text-xl font-medium mb-12'>
                  Предлагаем вашему вниманию <strong>демонстрационный вариант</strong> теста ИСТОК.
                  Этот вариант включает два раздела, Аудирование и Чтение.
                  <br /> <strong>Цель данного теста</strong> - определить уровень владения
                  английским языком в соответствии с международной шкалой. Вам будет предложено{" "}
                  <strong>4 задания</strong>.
                  <br /> Уровень сложности каждого следующего задания будет зависеть от количества
                  правильных ответов на предыдущее задание.
                  <br /> У вас будет <strong>40 минут</strong> на выполнение всего теста.
                  <br /> По окончании теста вы сразу узнаете свой уровень владения языком.
                </p>
                <Button
                  onClick={() => setIsStartPage(false)}
                  className={
                    "flex items-center justify-start gap-2 text-2xl font-semibold bg-background hover:bg-primary-neutral py-4 px-6 rounded-full transition-colors"
                  }>
                  Начать демо-тест <PlayIcon strokeWidth={2.5} />
                </Button>
              </div>
            </div>
            <TestStartPageIll className='absolute top-0 right-0' />
          </div>
        </div>
      ) : (
        <div className='flex items-start justify-between gap-8 px-20 py-32 relative'>
          <div className='flex min-w-16' />
          <div className='fixed flex flex-col gap-4 items-center justify-start'>
            {baseTasks.map((q, i) => (
              <div key={i}>
                <div
                  className={cn(
                    "text-2xl font-bold rounded-[24px] size-16 flex items-center justify-center border-2 border-transparent",
                    i === currentStep && "bg-background border-primary-green",
                    i > currentStep && "bg-primary-neutral",
                    i < currentStep && "bg-primary-green"
                  )}>
                  {q.type.slice(0, 1)[0].toUpperCase()}
                  {baseTasks.filter((q) => q.type === baseTasks[i].type).indexOf(baseTasks[i])}
                </div>
                {currentQuestion.parts.length > 1 && currentStep === i && (
                  <div className='flex flex-col items-center justify-center w-full mt-4 gap-4'>
                    {currentQuestion.parts.map((p, p_i) => (
                      <div
                        key={p_i}
                        className={cn(
                          "rounded-full size-4 border-2 border-transparent",
                          p_i === currentPart && "bg-background border-primary-green",
                          p_i > currentPart && "bg-primary-neutral",
                          p_i < currentPart && "bg-primary-green"
                        )}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className='flex-grow'>
            <Question
              question={currentQuestion}
              part={currentPart}
              onAnswer={handleAnswer}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default TestPage
