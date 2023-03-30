import { VueWrapper } from '@vue/test-utils'
import Expect = jest.Expect;

export const testHelpers = function (wrapper: VueWrapper, expect: Expect) {
  return {
    hasAttribute (selector:string, att:string, value: string) {
      return expect(wrapper.find(selector).attributes(att)).toBe(value)
    },
    find (selector: string) {
      expect(wrapper.find(selector).exists()).toBe(true)
    },
    isHidden (selector:string) {
      expect(wrapper.find(selector).isVisible()).toBe(false)
    },
    domHasLength (selector:string, length:number) {
      expect(wrapper.findAll(selector).length).toBe(length)
    }
  }
}
