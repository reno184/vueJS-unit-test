import { mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import { testHelpers } from '../../test-helpers'

describe('HelloWorld.vue', () => {
  const h = testHelpers(mount(HelloWorld), expect)

  it('check if p class foo has attribute data-bar foo', () => {
    h.hasAttribute('.foo', 'data-bar', 'foo')
  })

  it('check if div title id exist', () => {
    h.find('#title')
  })

  it('check element is hidden', () => {
    h.isHidden('#elementNotVisible')
  })
  it('check if 3 elements h3', () => {
    h.domHasLength('h3', 3)
  })
})
