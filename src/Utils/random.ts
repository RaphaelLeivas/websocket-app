export const generateRandomNumber = (numberOfDigits: number) =>
  Math.round(Math.random() * Math.pow(10, numberOfDigits))
