export const tempCalculation = (temp: number) => {
  if (Math.sign(Math.round(temp)) === -1) {
    return Math.round(temp)
  } else {
    return '+' + Math.round(temp)
  }
}
