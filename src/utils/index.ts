import { LEVEL } from '~/contracts'

export const extractMessage = (message: string, replace: string[]) => {
  let temp = message
  for (let i = 0; i < replace.length; i++) {
    temp = temp.replace('<>', replace[i])
  }
  return temp
}

export const formatNumber = (num: number): string => {
  const numStr = num.toString()
  const formattedNum: string[] = []
  const len = numStr.length
  for (let i = len - 1; i >= 0; i--) {
    formattedNum.push(numStr[i])
    if ((len - i) % 3 === 0 && i > 0) {
      formattedNum.push('.')
    }
  }
  return formattedNum.reverse().join('')
}

export function formatCurrency(value: number, currency: string = 'VND', locale: string = 'vi-VN'): string {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  })
  return formatter.format(value)
}

export const extractLevel = (value: LEVEL) => {
  switch (value) {
    case LEVEL.BASIC:
      return {
        color: '#21bc2b',
        title: 'Cơ bản'
      }
    case LEVEL.ADVANCED:
      return {
        color: '#f66868',
        title: 'Nâng cao'
      }
    case LEVEL.INTERMEDIATE:
      return {
        color: '#ff9242',
        title: 'Trung bình'
      }
  }
}
