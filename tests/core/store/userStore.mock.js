export const createUserStoreMock = function (loading, empty, error) {
  return {
    state: {
      loading,
      error: error ? 'oups an error...' : '',
      list: empty ? [] : [{ id: 1, name: 'Leanne Graham' }]
    },
    action: {
      fetch: jest.fn(function () {
        if (error) {
          return jest.fn().mockRejectedValue(new Error(''))
        } else {
          return jest.fn().mockResolvedValue({ json: jest.fn().mockResolvedValue([]) })
        }
      })
    }
  }
}
