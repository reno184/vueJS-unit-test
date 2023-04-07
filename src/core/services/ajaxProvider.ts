import { GStoreModel } from '@/main'

type IMethod = 'GET'| 'POST'|'PUT'| 'DELETE'
export function AjaxProvider (baseUrl: string, globalStore : GStoreModel) {
  const _fetch = function <T> (url: string, opts?: { method: IMethod, body? : string, headers? : Record<string, string>}): Promise<T | string | void> {
    return new Promise((resolve, reject) => {
      globalStore.blockers++
      fetch(url, {
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
      }).finally(() => globalStore.blockers--)
    })
  }

  return {
    list<T> (url:string): Promise<T> {
      return _fetch<T>(`${baseUrl}/${url}`) as Promise<T>
    },
    find<T> (url:string, id : string): Promise<T> {
      return _fetch<T>(`${baseUrl}/${url}/${id}`) as Promise<T>
    },
    post <T> (url: string, body: T): Promise<string> {
      return _fetch(`${baseUrl}/${url}`, { method: 'POST', body: JSON.stringify(body) }) as Promise<string>
    },
    put <T> (url: string, id : string, body: T): Promise<void> {
      return _fetch(`${baseUrl}/${url}/${id}`, { method: 'PUT', body: JSON.stringify(body) }) as Promise<void>
    },
    delete (url: string): Promise<void> {
      return _fetch(`${baseUrl}/${url}`, { method: 'DELETE' }) as Promise<void>
    }
  }
}
