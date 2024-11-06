"use client"
import { Task, TaskPart } from "@/features/test/AdaptiveTest"
import { useEffect, useState } from "react"
import QuestionAnswerPart from "../QuestionAnswerPart/QuestionAnswerPart"
import QuestionParagraphContent from "../QuestionParagraphContent"
import QuestionPartContents from "../QuestionPartContents/QuestionPartContents"

type Props = {
  partNumber: number
  task: Task
  part: TaskPart
  onUserAnswer: (answer: string | boolean, questionIndex: number) => void
}

const QuestionContentPart = ({ part, task, partNumber, onUserAnswer }: Props) => {
  const [currentTask, setCurrentTask] = useState(task)
  const [currentPart, setCurrentPart] = useState(part)

  useEffect(() => {
    setCurrentPart(part)
  }, [part])

  useEffect(() => {
    setCurrentTask(task)
  }, [task])

  if (currentPart.type === "match-paragraphs") {
    return (
      <div className='grid grid-cols-2 gap-8'>
        <div className='bg-primary-neutral w-full rounded-[48px] px-14 py-8 flex flex-col gap-4'>
          {currentPart.contents.map((content, i) => (
            <QuestionParagraphContent
              i={i}
              key={i}
              isLetter
              text={content.text}
              type={content.type}
            />
          ))}
        </div>
        <div className='bg-primary-green w-full rounded-[48px] px-14 py-8 flex flex-col gap-4'>
          <QuestionAnswerPart
            onUserAnswer={onUserAnswer}
            partNumber={partNumber}
            task={currentTask}
            part={currentPart}
          />
        </div>
      </div>
    )
  }

  if (currentPart.type === "match-paragraphs-listening") {
    return (
      <div className='grid grid-cols-2 gap-8'>
        <div className='bg-primary-neutral w-full rounded-[48px] px-14 py-8 flex flex-col gap-4'>
          {currentPart.contents.map((content, i) => (
            <QuestionParagraphContent
              i={i}
              key={i}
              text={content.text}
              type={content.type}
            />
          ))}
        </div>
        <div className='bg-primary-green w-full rounded-[48px] px-14 py-8 flex flex-col gap-4'>
          <QuestionAnswerPart
            onUserAnswer={onUserAnswer}
            partNumber={partNumber}
            task={currentTask}
            part={currentPart}
          />
        </div>
      </div>
    )
  }

  if (currentPart.type === "short-answer-questions") {
    return (
      <div className='bg-primary-green w-full rounded-[48px] px-14 py-8 flex flex-col gap-4'>
        <QuestionAnswerPart
          onUserAnswer={onUserAnswer}
          partNumber={partNumber}
          task={currentTask}
          part={currentPart}
        />
      </div>
    )
  }

  if (currentPart.type === "filling-gaps" || currentPart.type === "filling-gaps-forms") {
    return (
      <div
        className='grid gap-8'
        style={{
          gridTemplateColumns: "1fr max-content",
        }}>
        <div className='bg-primary-neutral w-full rounded-[48px] px-14 py-8 flex flex-col gap-4'>
          {currentPart.contents.map((content, i) => (
            <QuestionPartContents
              key={i}
              partContents={content}
              part={currentPart}
              onUserAnswer={onUserAnswer}
            />
          ))}
        </div>
        {currentPart.type === "filling-gaps-forms" && currentPart.answers && (
          <div className='bg-primary-green rounded-[48px] px-8 py-8 flex flex-col gap-2 text-2xl font-semibold'>
            {Object.values(currentPart.answers).map((key, i) => (
              <p
                key={i}
                className='uppercase'>
                <span className='inline-block font-mono'>{i}.</span> {key}
              </p>
            ))}
          </div>
        )}
      </div>
    )
  }

  if (currentPart.type === "true-false-questions") {
    return (
      <div className='bg-primary-green w-full rounded-[48px] px-14 py-8 flex flex-col gap-4'>
        <QuestionAnswerPart
          onUserAnswer={onUserAnswer}
          partNumber={partNumber}
          task={currentTask}
          part={currentPart}
        />
      </div>
    )
  }

  return <div>QuestionContentPart</div>
}

export default QuestionContentPart
