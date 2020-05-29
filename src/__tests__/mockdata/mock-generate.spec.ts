jest.mock('../../environment.ts', () => ({
  IS_DEV: true,
  IS_PROD: false,
}))

import { MockGenerate } from '../../mockdata/generate'

describe(`MockGenerate`, () => {
  let mockGenerate: MockGenerate

  beforeEach(() => {
    mockGenerate = new MockGenerate()
  })

  it(`should MockGenerate`, () => {
    // const actual = greeter.greet()
    // const expected = 'Hello, World!'

    // expect(actual).toBe(expected)
    mockGenerate.generateMock()
  })

  it(`should greet and print deprecation message if in dev mode`, () => {
    // const spyWarn = jest.spyOn(console, 'warn')
    // const actual = greeter.greetMe()
    // const expected = 'Hello, World!'
    // expect(actual).toBe(expected)
    // expect(spyWarn).toHaveBeenCalledWith(
    //   'this method is deprecated, use #greet instead'
    // )
  })
})
