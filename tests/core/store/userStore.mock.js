export const createUserStoreMock = function (loading, empty) {
  return {
    state: {
      loading,
      list: empty ? [] : [{ id: 1, name: 'Leanne Graham' }]
    },
    action: {
      fetch: jest.fn(function () {
        return Promise.resolve({
          json: function () {
            return Promise.resolve()
          }
        })
      })
    }
  }
}
