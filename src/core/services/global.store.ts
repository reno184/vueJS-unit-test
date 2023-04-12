import { reactive } from 'vue'

export interface IGlobalStore {
  action: {
    blockers : {
      increment : () => void
      decrement: ()=> void
    }
  },
  state : {
    blockers: number
  }
}

export const globalStore = function () {
  const state = reactive({ blockers: 0 })
  const mutation = {
    increment: () => {
      state.blockers++
    },
    decrement: () => {
      state.blockers--
    }
  }
  return {
    action: {
      blockers: {
        increment: function (): void {
          mutation.increment()
        },
        decrement: function (): void {
          mutation.decrement()
        }
      }
    },
    state
  }
}
