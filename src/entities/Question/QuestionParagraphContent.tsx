import { ParagraphContent } from "@/features/test/AdaptiveTest"
import { alphabet } from "@/shared/lib/utils"

type Props = ParagraphContent & {
  i: number
  isLetter?: boolean
}

const QuestionParagraphContent = ({ i, text, isLetter }: Props) => {
  return (
    <div key={i} className="flex items-start justify-start">
      <span className='text-2xl font-semibold w-4 mr-4 inline-block uppercase'>
        {isLetter ? alphabet[i] : `${i + 1}.`}
      </span>
      <p className='text-2xl font-medium flex-grow'>{text}</p>
    </div>
  )
}

export default QuestionParagraphContent
