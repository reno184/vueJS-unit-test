import { isObjectEmpty, changeMaker } from '@/core/services/utilities'

describe('services utilities', () => {
  // https://www.digitalocean.com/community/tutorials/testing-jest-intro
  it('divides down to the nearest integer.', () => {
    const result = isObjectEmpty({ })
    expect(result).toBe(true)
  })

  // https://www.digitalocean.com/community/tutorials/testing-snapshot-testing-jest
  it('gives proper change.', () => {
    expect(changeMaker(1.99)).toMatchSnapshot()
    expect(changeMaker(2.75)).toMatchSnapshot()
    expect(changeMaker(0.24)).toMatchSnapshot()
    // And so on
  })
})
