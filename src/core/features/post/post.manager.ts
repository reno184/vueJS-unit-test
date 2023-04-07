export const postManager = function () {
  return {
    list: async function<T> (): Promise<T> {
      try {
        const result = await fetch('https://jsonplaceholder.typicode.com/posts')
        return result.json()
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
