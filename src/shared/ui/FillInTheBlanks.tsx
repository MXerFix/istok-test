import { Field, Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react"
import { ChevronDown } from "lucide-react"
import React from "react"
import { cn } from "../lib/utils"

interface FillInTheBlanksProps {
  type?: "select" | "input"
  onUserAnswer?: (answer: string, questionIndex: number) => void
  text: string
  options: { [key: string]: string[] }
}

const FillInTheBlanks: React.FC<FillInTheBlanksProps> = ({
  type = "select",
  text,
  options,
  onUserAnswer,
}) => {
  // Регулярное выражение для поиска {(0)}, {(1)}, ...
  const regex = /\{\((\d+)\)\}/g

  // Разбиваем текст и подставляем select-элементы
  const parts = text.split(regex)

  return (
    <div className='text-2xl font-medium'>
      {parts.map((part, index) => {
        const isOptionIndex = index % 2 === 1 // нечетные индексы — это индексы пробелов, четные — текст

        if (isOptionIndex) {
          const optionIndex = parseInt(part, 10)
          if (type === "select") {
            const selectOptions = options[optionIndex] || []
            const [selectedOption, setSelectedOption] = React.useState("____")
            const maxOptionLength = selectOptions.reduce(
              (acc, option) => Math.max(acc, option.length),
              0
            )
            const maxOptionWidth = `${maxOptionLength * 8 + 128}px`

            return (
              <Field
                key={index}
                style={{
                  minWidth: maxOptionWidth,
                }}
                className={cn(`inline-flex bg-background px-1 py-1 rounded-xl mx-2 my-1`)}>
                <span className='bg-primary-green size-8 text-center rounded-lg inline-block mr-2'>
                  {optionIndex}
                </span>
                {type === "select" ? (
                  <Listbox
                    value={selectedOption}
                    disabled={optionIndex === 0}
                    onChange={(e) => {
                      setSelectedOption(e)
                      onUserAnswer?.(e, optionIndex)
                    }}>
                    <ListboxButton
                      className={cn(
                        "group inline-flex flex-grow items-center justify-between gap-2 bg-transparent rounded-xl outline-none relative",
                        optionIndex === 0
                          ? "cursor-not-allowed font-bold"
                          : "cursor-pointer font-medium"
                      )}>
                      {optionIndex === 0 ? selectOptions[0] : selectedOption}
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
                      style={{
                        minWidth: maxOptionWidth,
                      }}
                      className={
                        "bg-background text-xl font-medium p-1 rounded-xl border border-black -translate-x-5 transition duration-200 ease-out origin-top data-[closed]:scale-y-90 data-[closed]:-translate-y-1 data-[closed]:opacity-0"
                      }>
                      {selectOptions.map((option, idx) => (
                        <ListboxOption
                          className={
                            "cursor-pointer hover:bg-primary-green px-2 py-1 my-0.5 rounded-[8px] transition-colors data-[selected]:bg-primary-green"
                          }
                          key={idx}
                          value={option}>
                          {option}
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </Listbox>
                ) : (
                  <div></div>
                )}
              </Field>
            )
          } else if (type === "input") {
            return (
              <Field
                key={index}
                className='inline-flex bg-background px-1 py-1 rounded-xl mx-2 my-1 w-max'>
                <span className='bg-primary-green size-8 text-center rounded-lg inline-block mr-2'>
                  {optionIndex}
                </span>
                <input
                  disabled={optionIndex === 0}
                  className={cn(
                    "min-w-0 w-32 text-center bg-transparent font-medium text-2xl outline-none",
                    optionIndex === 0 ? "cursor-not-allowed font-semibold" : "cursor-text"
                  )}
                  defaultValue={optionIndex === 0 ? options[0] : ""}
                  onChange={(e) => {
                    onUserAnswer?.(e.target.value, optionIndex)
                  }}
                />
              </Field>
            )
          }
        } else {
          return part // Часть текста без пробела
        }
      })}
    </div>
  )
}

export default FillInTheBlanks
