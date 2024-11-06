"use client"
import AudioPlayer from "@/entities/AudioPlayer/AudioPlayer"
import QuestionContentPart from "@/entities/Question/QuestionContentPart/QuestionContentPart"
import QuestionParagraphContent from "@/entities/Question/QuestionParagraphContent"
import { Task } from "@/features/test/AdaptiveTest"
import Button from "@/shared/ui/Button/Button"
import { useEffect, useState } from "react"

type QuestionProps = {
  question: Task
  part: number
  onAnswer: (correctPercentage: number) => void
}

const checkAnswers = (userAnswers: Record<string, string>, keys: Record<string, string>) => {
  // Сначала убираем "пример" из ключей
  const filteredKeys = Object.keys(keys).filter((key) => key !== "0")

  // Считаем количество правильных ответов, исключая "пример"
  const correctAnswers = filteredKeys.reduce((acc, key) => {
    const value = userAnswers[key]
    const correctValue = keys[key]

    if (Array.isArray(correctValue)) {
      return correctValue.includes(value) ? acc + 1 : acc
    }
    return correctValue === value ? acc + 1 : acc
  }, 0)

  // Считаем процент правильных ответов
  const correctPercentage = correctAnswers / filteredKeys.length
  return correctPercentage
}

const Question = ({ question, part, onAnswer }: QuestionProps) => {
  const [currentPart, setCurrentPart] = useState(question.parts[part - 1])
  const [userAnswers, setUserAnswers] = useState(
    Object.fromEntries(Object.keys(currentPart.keys).map((key, i) => [key, "undefined"]))
  )

  const handleQuestionAnswer = (answer: string | boolean, questionIndex: number) => {
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: answer,
    })
  }

  // console.log(userAnswers)

  const handleAnswer = () => {
    onAnswer(checkAnswers(userAnswers, currentPart.keys))
  }

  useEffect(() => {
    setCurrentPart(question.parts[part - 1])
  }, [part, question])

  useEffect(() => {
    setUserAnswers(
      Object.fromEntries(Object.keys(currentPart.keys).map((key, i) => [key, "undefined"]))
    )
  }, [currentPart])

  return (
    <div className='grid gap-6'>
      <div className='bg-primary-green w-full rounded-[48px] px-14 py-8 flex flex-col gap-6'>
        <h2 className='text-2xl font-bold uppercase'>{question.name}</h2>
        <p className='text-2xl font-bold'>{currentPart.name}</p>
        <p className='text-2xl font-semibold'>{currentPart.exercise}</p>
        {currentPart.glossary && (
          <div className='flex flex-col items-start justify-start italic'>
            {currentPart.glossary.map((glossary, i) => (
              <div
                key={glossary.translation}
                className='flex items-center justify-start gap-2'>
                <p className='text-xl font-semibold'>{glossary.word}</p>-
                <p className='text-xl font-medium'>{glossary.translation}</p>
              </div>
            ))}
          </div>
        )}
        {question.type === "listening" && question.contents && (
          <AudioPlayer
            key={question.contents[0].url}
            src={`${window.location.origin}/${question.contents[0].url}`}
            disablePause
          />
        )}
      </div>
      {/* Question common content */}
      {(question.type === "reading" || question.type === "listening") && question.contents && (
        <>
          {question.type === "reading" && (
            <div className='bg-primary-neutral w-full rounded-[48px] px-14 py-8 flex flex-col gap-4'>
              {question.contents.map((content, i) => (
                <QuestionParagraphContent
                  i={i}
                  key={content.text}
                  text={content.text}
                  type={content.type}
                />
              ))}
            </div>
          )}
        </>
      )}
      <div>
        <QuestionContentPart
          onUserAnswer={handleQuestionAnswer}
          partNumber={part}
          task={question}
          part={currentPart}
        />
      </div>
      <div className='flex justify-end'>
        <Button
          onClick={handleAnswer}
          color='green'
          className='text-foreground text-2xl px-6'>
          Продолжить {">>"}
        </Button>
      </div>
    </div>
  )
}

export default Question
