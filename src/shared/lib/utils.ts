import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Сгруппировать массив объектов по заданному полю.
 * @param {Array} array Массив объектов, который нужно сгруппировать.
 * @param {string} key Ключ поля, по которому будет происходить группировка.
 * @returns {Object} Объект, в котором ключи - это значения поля, а значения - массивы объектов.
 */
export function groupBy(array: any[], key: string) {
  return array.reduce((acc, item) => {
    // Получаем значение поля для текущего объекта
    const groupKey = item[key]

    // Если группа с таким ключом еще не существует, создаем ее
    if (!acc[groupKey]) {
      acc[groupKey] = []
    }

    // Добавляем объект в соответствующую группу
    acc[groupKey].push(item)

    return acc
  }, {})
}

export const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
]
