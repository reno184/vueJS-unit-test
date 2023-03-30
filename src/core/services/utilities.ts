export function isObjectEmpty (object: Record<string, unknown>): boolean {
  for (const property in object) {
    if (object[property]) { return false }
  }
  return true
}
export function changeMaker (value: number) {
  let pennies = value * 100
  const quarters = Math.floor(pennies / 25)
  pennies -= quarters * 25
  const dimes = Math.floor(pennies / 10)
  pennies -= dimes * 10
  const nickels = Math.floor(pennies / 5)
  pennies -= nickels * 5
  return {
    quarters,
    dimes,
    nickels,
    pennies
  }
}
