import axios from 'axios'

export interface IAxiosProvider{
    fetch: <T>(url:string)=> Promise<T>
   delete: (url: string, id : number)=> Promise<void>
}

export const CreateAxiosProvider = function (): IAxiosProvider {
  const prefixUrl = 'https://jsonplaceholder.typicode.com/'
  return {
    fetch: async function <T> (url : string):Promise<T> {
      const result = await axios.get(`${prefixUrl}${url}`)
      return result.data
    },
    delete: async function (url: string, id : number):Promise<void> {
      await axios.delete(`${prefixUrl}${url}/${id}`)
    }
  }
}
