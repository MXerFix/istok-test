"use client"
import { AdaptiveTest, Task } from "@/features/test/AdaptiveTest"
import Question from "@/widgets/Question/Question"
// import { useRouter } from "next/navigation"
import { cn } from "@/shared/lib/utils"
import Header from "@/widgets/Header/Header"
import { useEffect, useState } from "react"
import questions from "../../../test.json"

const TestPage = () => {
  // const router = useRouter()
  const [test] = useState(new AdaptiveTest(questions as Task[])) // Создание экземпляра теста
  const [currentStep, setCurrentStep] = useState(0) // Начинаем с первого вопроса
  const [currentQuestion, setCurrentQuestion] = useState(test.getQuestionByIndex(currentStep))
  const [currentPart, setCurrentPart] = useState(1)
  const [finalResults, setFinalResults] = useState<number[]>([])
  const [intResults, setIntResults] = useState<number[]>([])

  // Обновляем текущий вопрос при изменении шага
  useEffect(() => {
    setCurrentQuestion(test.getQuestionByIndex(currentStep))
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

  // Если текущего вопроса больше нет, значит, тест завершен
  if (!currentQuestion || test.isTestComplete()) {
    // router.push("/test/results") // Переход на страницу результатов
    console.log("no questions")
    return (
      <div className='flex items-center justify-center text-6xl font-semibold'>
        <p>Тест завершен! Результат:</p>
        <p>
          {Math.round(
            (finalResults.reduce((acc, result) => acc + result, 0) / finalResults.length) * 100
          )}
          %
        </p>
      </div>
    )
  }

  return (
    <div className='bg-background min-h-screen'>
      <Header isLoginButtonsHide />
      <div className='flex items-start justify-between gap-8 px-20 py-32'>
        <div className="flex min-w-16" />
        <div className='fixed flex flex-col gap-4 items-center justify-start'>
          {questions.map((q, i) => (
            <div key={i}>
              <div
                className={cn(
                  "text-2xl font-bold rounded-[24px] size-16 flex items-center justify-center border-2 border-transparent",
                  i === currentStep && "bg-background border-primary-green",
                  i > currentStep && "bg-primary-neutral",
                  i < currentStep && "bg-primary-green"
                )}>
                {q.type.slice(0, 1)[0].toUpperCase()}
                {questions.filter((q) => q.type === questions[i].type).indexOf(questions[i])}
              </div>
              {q.parts.length > 1 && currentStep === i && (
                <div className='flex flex-col items-center justify-center w-full mt-4 gap-4'>
                  {q.parts.map((p, p_i) => (
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
    </div>
  )
}

export default TestPage
