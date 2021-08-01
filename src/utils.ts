import product from 'cartesian-product'

const numbers = {
  2: ['a', 'b', 'c'],
  3: ['d', 'e', 'f'],
  4: ['g', 'h', 'i'],
  5: ['j', 'k', 'l'],
  6: ['m', 'n', 'o'],
  7: ['p','q', 'r', 's'],
  8: ['t', 'u', 'v'],
  9: ['w', 'x', 'y', 'z']
}

export const productNumbers = (num: string): string[][] => {
  const matched = num
    .split('')
    .reduce((acc, n) => {
      if(numbers[n]) {
        acc.push(numbers[n])
      }

      return acc
    }, [])

  return product(matched)
}