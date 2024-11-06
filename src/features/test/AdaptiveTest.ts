import { AlphabetType } from "@/shared/lib/util_types"

type Level = "A2" | "B1" | "B2" | "C1" | string

export interface BaseTaskPartContent {
  type:
    | "paragraph"
    | "question"
    | "gaps-text"
    | "text"
    | "heading"
    | "example"
    | "vocabulary"
    | "audio"
}

// Специфичные интерфейсы для каждого типа контента

export interface ParagraphContent extends BaseTaskPartContent {
  type: "paragraph"
  text: string // Текст параграфа
}

export interface QuestionsContent extends BaseTaskPartContent {
  type: "question"
  question: string // Вопросы и ответы
}

export interface GapsTextContent extends BaseTaskPartContent {
  type: "gaps-text"
  text: string // Текст с пропусками, отмеченными, например, как [___]
}

export interface SimpleTextContent extends BaseTaskPartContent {
  type: "text"
  text: string
}

export interface HeadingContent extends BaseTaskPartContent {
  type: "heading"
  title: string // Заголовок задачи
  level: number // Уровень заголовка, например, 1, 2, 3
}

export interface ExampleContent extends BaseTaskPartContent {
  type: "example"
  example: string // Текст примера
  explanation: string // Объяснение примера
}

export interface VocabularyContent extends BaseTaskPartContent {
  type: "vocabulary"
  words: { word: string; definition: string }[] // Массив слов с их определениями
}

export interface AudioContent extends BaseTaskPartContent {
  type: "audio"
  url: string
}

// Общий тип для TaskPartContent
export type TaskPartContent =
  | ParagraphContent
  | QuestionsContent
  | GapsTextContent
  | SimpleTextContent
  | HeadingContent
  | ExampleContent
  | VocabularyContent
  | AudioContent

export interface TaskPartBase {
  name: string
  exercise: string
  type:
    | "filling-gaps"
    | "true-false-questions"
    | "match-paragraphs"
    | "filling-gaps-forms"
    | "short-answer-questions"
    | "match-paragraphs-listening"
  contents: TaskPartContent[]
}

export interface TaskPartFillGaps extends TaskPartBase {
  type: "filling-gaps"
  contents: GapsTextContent[]
  answers: { [key: string]: string[] }
  keys: { [key: string]: string }
}

export interface TaskPartTrueFalse extends TaskPartBase {
  type: "true-false-questions"
  contents: QuestionsContent[]
  keys: { [key: string]: string }
}

export interface TaskPartMatchParagraphs extends TaskPartBase {
  type: "match-paragraphs"
  contents: ParagraphContent[]
  keys: { [key: string]: AlphabetType }
  answers: { [key: string]: AlphabetType }
}

export interface TaskPartMatchParagraphsListening extends TaskPartBase {
  type: "match-paragraphs-listening"
  contents: ParagraphContent[]
  keys: { [key: string]: AlphabetType }
  answers: { [key: string]: AlphabetType }
}

export interface TaskPartShortAnswerQuestions extends TaskPartBase {
  type: "short-answer-questions"
  contents: QuestionsContent[]
  answers: { [key: string]: string[] }
  keys: { [key: string]: string }
}

export interface TaskPartFillGapsForms extends TaskPartBase {
  type: "filling-gaps-forms"
  contents: TaskPartContent[]
  answers: { [key: string]: string[] }
  keys: { [key: string]: string }
}

// Общий тип для TaskPart
export type TaskPart =
  | TaskPartFillGaps
  | TaskPartTrueFalse
  | TaskPartMatchParagraphs
  | TaskPartMatchParagraphsListening
  | TaskPartFillGapsForms
  | TaskPartShortAnswerQuestions

export interface BaseTask {
  name: string
  level: Level
  task_number: number
  variant: number
  parts: TaskPart[]
  type: "reading" | "listening" | "writing" | "speaking"
}

export interface ReadingTask extends BaseTask {
  type: "reading"
  contents?: ParagraphContent[]
}

export interface ListeningTask extends BaseTask {
  type: "listening"
  contents?: AudioContent[]
}

export interface WritingTask extends BaseTask {
  type: "writing"
}

export interface SpeakingTask extends BaseTask {
  type: "speaking"
}

export type Task = ReadingTask | ListeningTask | WritingTask | SpeakingTask

export class AdaptiveTest {
  public questions: Task[]
  private currentQuestionIndex: number = 0
  private currentLevel: Level
  private score: number = 0

  constructor(questions: Task[], initialLevel: Level = "A2") {
    this.questions = questions
    this.currentLevel = initialLevel
  }

  // Получение текущего вопроса
  public getCurrentQuestion(): Task | undefined {
    return this.questions.find(
      (q, index) => q.level === this.currentLevel && index === this.currentQuestionIndex
    )
  }

  public getQuestionByIndex(index: number): Task | undefined {
    console.log(this.questions, index)
    return this.questions.find((q, i) => q.level === this.currentLevel && i === index)
  }

  // Обработка ответа и обновление уровня
  public handleAnswer(correctPercentage: number): void {
    // if (correctPercentage >= 0.8) {
    //   this.score += 1
    //   this.increaseLevel()
    // } else if (correctPercentage < 0.6) {
    //   this.decreaseLevel()
    // }
    this.nextQuestion()
  }

  // Переход к следующему вопросу
  private nextQuestion(): void {
    this.currentQuestionIndex += 1
  }

  // Повышение уровня
  private increaseLevel(): void {
    if (this.currentLevel === "C1") return
    this.currentLevel = `B${+this.currentLevel[1] + 1}` as Level
  }

  // Понижение уровня
  private decreaseLevel(): void {
    if (this.currentLevel === "A2") return
    this.currentLevel = `B${+this.currentLevel[1] - 1}` as Level
  }

  // Проверка завершения теста
  public isTestComplete(): boolean {
    return this.currentQuestionIndex >= this.questions.length
  }

  // Получение итогов
  public getResults() {
    return {
      score: this.score,
      finalLevel: this.currentLevel,
    }
  }
}
