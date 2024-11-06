"use client"
import { TaskPart, TaskPartContent } from "@/features/test/AdaptiveTest"
import FillInTheBlanks from "@/shared/ui/FillInTheBlanks"

type Props = {
  partContents: TaskPartContent
  part: TaskPart
  onUserAnswer?: (answer: string, questionIndex: number) => void
}

const QuestionPartContents = ({ partContents, part, onUserAnswer }: Props) => {
  const { type } = partContents
  if (type === "gaps-text" && part.type === "filling-gaps") {
    return (
      <div>
        <FillInTheBlanks
          text={partContents.text}
          options={part.answers}
          onUserAnswer={onUserAnswer}
        />
      </div>
    )
  }

  if (type === "gaps-text" && part.type === "filling-gaps-forms") {
    return (
      <div>
        <FillInTheBlanks
          text={partContents.text}
          options={{
            "0": [part.keys["0"]],
          }}
          onUserAnswer={onUserAnswer}
          type="input"
        />
      </div>
    )
  }

  return <div></div>
}

export default QuestionPartContents
