import { Task, TaskPart } from "@/features/test/AdaptiveTest"
import { cn } from "@/shared/lib/utils"
import { Field, Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react"
import { ChevronDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const getPreviousPartsKeysLength = (partNumber: number, task: Task) => {
  const previousParts = task.parts.slice(0, partNumber - 1)
  return previousParts.reduce((acc, part) => {
    return acc + Object.keys(part.keys).length
  }, 0)
}

type Props = {
  partNumber: number
  task: Task
  part: TaskPart
  onUserAnswer: (answer: string | boolean, questionIndex: number) => void
}

const QuestionAnswerPart = ({ part, task, partNumber, onUserAnswer }: Props) => {
  const [previousPartsKeysLength, setPreviousPartsKeysLength] = useState(0)
  useEffect(() => {
    setPreviousPartsKeysLength(getPreviousPartsKeysLength(partNumber, task))
  }, [partNumber])

  const [keysLength, setKeysLength] = useState(Object.keys(part.keys).length)
  useEffect(() => {
    setKeysLength(Object.keys(part.keys).length)
  }, [part, task, partNumber])

  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    onUserAnswer(e.target.value, index + 1)

    // Переход к следующему input, если он существует
    if (e.target.value.length === 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  if (part.type === "match-paragraphs" || part.type === "match-paragraphs-listening") {
    return (
      <div className='grid gap-2'>
        <p className='text-2xl font-bold mb-8'>Your answer:</p>
        {Array.from({ length: keysLength }).map((_, i) => {
          return (
            <div
              key={i}
              className='flex items-center justify-start gap-4'>
              <span className={cn(
                'text-2xl font-semibold w-4 mr-4 inline-block',
                part.answers[0] !== "a" && "w-20"
              )}>
                {part.answers[0] !== "a"
                  ? `${previousPartsKeysLength + i + 1}) ${part.answers[i]}`
                  : `${previousPartsKeysLength + i + 1}.`}
              </span>
              <input
                ref={(el) => {
                  inputRefs.current[i] = el
                }}
                autoFocus={i === 0}
                id={(task.task_number + partNumber + i).toString()}
                key={(task.task_number + partNumber + i).toString()}
                defaultValue={""}
                className='size-10 text-center py-2 block text-2xl font-medium uppercase rounded-[8px] outline-black'
                type='text'
                maxLength={1}
                onChange={(e) => handleInputChange(e, i)}
              />
            </div>
          )
        })}
      </div>
    )
  }

  if (part.type === "short-answer-questions") {
    return (
      <div className='grid gap-2'>
        <p className='text-2xl font-bold mb-8'>Your answer:</p>
        {part.contents.map((content, i) => (
          <div
            key={i}
            className='flex items-center justify-between gap-4'>
            <div>
              <span className='text-2xl font-semibold mr-4 inline-block'>
                {previousPartsKeysLength + i + 1}.
              </span>
              <p className='text-2xl font-semibold inline-block'>{content.question}</p>
            </div>
            <input
              className='w-2/5 py-2 px-4 block text-2xl font-medium rounded-[12px] outline-black'
              type='text'
              onChange={(e) => onUserAnswer(e.target.value, i + 1)}
            />
          </div>
        ))}
      </div>
    )
  }

  if (part.type === "true-false-questions") {
    return (
      <div className='grid gap-2'>
        <p className='text-2xl font-bold mb-8'>Your answer:</p>
        {part.contents.map((content, i) => {
          const [value, setValue] = useState("____")
          return (
            <div
              key={i}
              className='flex items-center justify-between gap-4'>
              <div>
                <span className='text-2xl font-semibold mr-4 inline-block'>
                  {previousPartsKeysLength + i + 1}.
                </span>
                <p className='text-2xl font-semibold inline-block'>{content.question}</p>
              </div>
              <Field
                className={cn(
                  `text-2xl font-medium flex bg-background px-1 py-1 rounded-xl mx-2 my-1`
                )}>
                <span className='bg-primary-green size-8 text-center rounded-lg inline-block mr-2'>
                  {i + 1}
                </span>
                <Listbox
                  value={value}
                  onChange={(e) => {
                    setValue(e)
                    onUserAnswer?.(e.toLowerCase(), i)
                  }}>
                  <ListboxButton
                    className={cn(
                      "w-32 group inline-flex flex-grow items-center justify-between gap-2 bg-background rounded-xl outline-none relative"
                    )}>
                    {value}
                    <span className='transition bg-primary-neutral group-data-[disabled]:bg-neutral-100 hover:bg-neutral-300 group-data-[open]:bg-neutral-300 rounded-lg p-1'>
                      <ChevronDown className='transition group-data-[disabled]:text-neutral-300 group-data-[open]:rotate-180' />
                    </span>
                  </ListboxButton>
                  <ListboxOptions
                    transition
                    anchor={{
                      to: "bottom",
                      gap: 8,
                    }}
                    className={
                      "w-[var(--button-width)] bg-background text-xl font-medium p-1 rounded-xl border border-black -translate-x-5 transition duration-200 ease-out origin-top data-[closed]:scale-y-90 data-[closed]:-translate-y-1 data-[closed]:opacity-0"
                    }>
                    <ListboxOption
                      className={
                        "cursor-pointer hover:bg-primary-green px-2 py-1 my-0.5 rounded-[8px] transition-colors data-[selected]:bg-primary-green"
                      }
                      value={"TRUE"}>
                      {"TRUE"}
                    </ListboxOption>
                    <ListboxOption
                      className={
                        "cursor-pointer hover:bg-primary-green px-2 py-1 my-0.5 rounded-[8px] transition-colors data-[selected]:bg-primary-green"
                      }
                      value={"FALSE"}>
                      {"FALSE"}
                    </ListboxOption>
                  </ListboxOptions>
                </Listbox>
              </Field>
            </div>
          )
        })}
      </div>
    )
  }

  return <div>QuestionContentPart</div>
}

export default QuestionAnswerPart
