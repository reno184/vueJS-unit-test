describe('mock service', () => {
  it('first test mock.', () => {
    const mock = jest.fn().mockReturnValue(4)
    console.log(mock())
  })
}
)
