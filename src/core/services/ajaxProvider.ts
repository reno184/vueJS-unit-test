import { IGlobalStore } from '@/core/services/global.store'

type IMethod = 'GET'| 'POST'|'PUT'| 'DELETE'
export interface IAjaxProvider {
  list: <T>(url:string)=> Promise<T>
  find: <T>(url:string, id : string)=> Promise<T>
  post :<T> (url: string, body: T)=> Promise<string>
  put :<T> (url: string, id : string, body: T)=> Promise<void>
  delete: (url: string, id : number)=> Promise<void>
}
export function AjaxProvider (globalStore : IGlobalStore): IAjaxProvider {
  const _fetch = function <T> (url: string, opts?: { method: IMethod, body? : string, headers? : Record<string, string>}): Promise<T | string | void> {
    return new Promise((resolve, reject) => {
      globalStore.state.blockers++
      setTimeout(function () {
        fetch('https://jsonplaceholder.typicode.com/' + url, {
          method: opts && opts.method,
          body: opts && opts.body,
          headers: opts && opts.headers
        }).then(resp => {
          if (resp.status === 200) {
            if (opts && opts.method === 'POST') {
              resp.text().then(newId => resolve(newId))
            } else if (opts && (opts.method === 'PUT' || opts.method === 'DELETE')) {
              resolve()
            } else {
              resp.json().then(result => resolve(result as T))
            }
          } else {
            reject(new Error(resp.statusText + ': ' + resp.text()))
          }
        }).catch(err => {
          reject(new Error(err.message))
        }).finally(() => {
          globalStore.state.blockers--
        })
      }, 1000)
    })
  }

  return {
    list<T> (url:string): Promise<T> {
      return _fetch<T>(url) as Promise<T>
    },
    find<T> (url:string, id : string): Promise<T> {
      return _fetch<T>(`${url}/${id}`) as Promise<T>
    },
    post <T> (url: string, body: T): Promise<string> {
      return _fetch(`${url}`, { method: 'POST', body: JSON.stringify(body) }) as Promise<string>
    },
    put <T> (url: string, id : string, body: T): Promise<void> {
      return _fetch(`${url}/${id}`, { method: 'PUT', body: JSON.stringify(body) }) as Promise<void>
    },
    delete (url: string, id : number): Promise<void> {
      return _fetch(`${url}/${id}`, { method: 'DELETE' }) as Promise<void>
    }
  }
}
