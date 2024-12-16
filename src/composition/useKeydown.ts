import { onBeforeUnmount } from 'vue'

export const useKeydown = function (keyCombos:{key : string, fn:() => void}[]) {
  const _onKey = function (event: KeyboardEvent) {
    const kc = keyCombos.find(x => x.key === event.key)
    if (kc) {
      kc.fn()
    }
  }

  window.addEventListener('keydown', _onKey)

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', _onKey)
  })
}

export default useKeydown
