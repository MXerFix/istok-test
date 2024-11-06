"use client"
import { AdaptiveTest, Task } from "@/features/test/AdaptiveTest"
// import { useRouter } from "next/navigation"
import { cn } from "@/shared/lib/utils"
import { Pattern } from "@/shared/svg/Pattern"
import TestStartPageIll from "@/shared/svg/TestStartPageIll"
import Header from "@/widgets/Header/Header"
import { Button } from "@headlessui/react"
import { PlayIcon } from "lucide-react"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import questions from "../../../test.json"

const Question = dynamic(() => import("../../widgets/Question/Question"), {
  ssr: false,
})

const TestPage = () => {
  // const router = useRouter()
  const [isStartPage, setIsStartPage] = useState(true)
  const [test] = useState(new AdaptiveTest(questions as Task[])) // Создание экземпляра теста
  const [currentStep, setCurrentStep] = useState(0) // Начинаем с первого вопроса
  const [currentQuestion, setCurrentQuestion] = useState(test.getRandomQuestion(currentStep))
  const [currentPart, setCurrentPart] = useState(1)
  const [finalResults, setFinalResults] = useState<number[]>([])
  const [intResults, setIntResults] = useState<number[]>([])

  // Обновляем текущий вопрос при изменении шага
  useEffect(() => {
    setCurrentQuestion(test.getRandomQuestion(currentStep))
  }, [currentStep])

  console.log(intResults)

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
    console.log(result)
    setFinalResults([...finalResults, result])
    test.handleAnswer(result) // Обработка ответа
    setIntResults([])
    setCurrentPart(1)
    setCurrentStep((prevStep) => prevStep + 1)
  }

  // console.log()

  // Если текущего вопроса больше нет, значит, тест завершен
  if (!currentQuestion || test.isTestComplete()) {
    // router.push("/test/results") // Переход на страницу результатов
    console.log("no questions")
    return (
      <div className='w-full h-full flex flex-col items-center justify-center text-6xl font-semibold'>
        <p>Тест завершен! Результат:</p>
        <p className='text-primary-green-dark font-uncage'>
          {Math.round(
            (finalResults.reduce((acc, result) => acc + result, 0) / finalResults.length) * 100
          )}
          %
        </p>
      </div>
    )
  }

  const baseTasks = questions.filter((q) => q.variant === 1 && q.level === "B1")

  return (
    <div className='bg-background min-h-screen'>
      <Header isLoginButtonsHide />
      {isStartPage ? (
        <div className='fixed top-0 left-0 w-full h-full bg-background z-30'>
          <div className='max-w-[1519px] w-full h-full mx-auto px-28 grid grid-cols-2 items-center justify-center relative'>
            <div className='px-14 py-28 bg-primary-green rounded-[32px] relative overflow-hidden'>
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
                  Тест состоит из разделов «Чтение» и «Аудирование», вы не ограничены во времени
                  прохождения. Прохождение тестирования в среднем занимает 30-40 минут. Сразу по
                  окончании теста вы получаете результат.
                </p>
                <Button
                  onClick={() => setIsStartPage(false)}
                  className={
                    "flex items-center justify-start gap-2 text-2xl font-semibold bg-background hover:bg-primary-neutral py-4 px-6 rounded-full transition-colors"
                  }>
                  Начать демо-тест <PlayIcon />
                </Button>
              </div>
            </div>
            <TestStartPageIll className='absolute top-0 right-0' />
          </div>
        </div>
      ) : (
        <div className='flex items-start justify-between gap-8 px-20 py-32'>
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
