import { mount } from '@vue/test-utils'
import comp from '@/components/MailView.vue'
import { nextTick } from 'vue'
const fs = require('fs')
describe('[Mail module] modal - content ', function () {
  const closeModal = jest.fn()
  const updateEmailFn = jest.fn()
  const data = JSON.parse(fs.readFileSync('db.json', 'utf-8'))
  const wrapper = mount(comp, {
    props: {
      emails: data.emails,
      updateEmailFn,
      closeModal
    }
  })
  test('component is exist', function () {
    expect(wrapper.exists()).toBeTruthy()
  })
  it('should call useKeyDown composable on created', function () {
    const useKeyDown = jest.fn()
    useKeyDown()
    expect(useKeyDown).toHaveBeenCalledTimes(1)
  })
  it('should close the modal when button close is clicked', async function () {
    const btnClose = wrapper.get('[data-test=btnClose]')
    expect(btnClose).toBeTruthy()
    await btnClose.trigger('click')
    expect(closeModal.mock.calls).toHaveLength(1)
  })

  it('should return to the first mail when at the latest position the next button is clicked', async function () {
    await wrapper.setData({ index: 3 })
    await wrapper.get('[data-test=btnNext]').trigger('click')
    const exceptedSubject = wrapper.vm.$props.emails[0].subject
    expect(wrapper.get('[data-test=renderMailSubject]').html()).toContain(exceptedSubject)
  })

  it('should return to the last mail when at the first position the prev button is clicked', async function () {
    await wrapper.setData({ index: 0 })
    await wrapper.get('[data-test=btnPrev]').trigger('click')
    const exceptedSubject = wrapper.vm.$props.emails[3].subject
    expect(wrapper.get('[data-test=renderMailSubject]').html()).toContain(exceptedSubject)
  })

  it('should toggle the fav icon when favorite button is clicked', async function () {
    await wrapper.setData({ index: 0 })
    wrapper.vm.$props.emails[0].favorite = true
    expect(wrapper.get('[data-test=renderNotFav]')).toBeTruthy()
    await wrapper.get('[data-test=btnFav]').trigger('click')
    expect(updateEmailFn).toHaveBeenCalledWith(wrapper.vm.$props.emails[0], { toggleFavorite: true })
    wrapper.vm.$props.emails[0].favorite = true
    await nextTick()
    expect(wrapper.get('[data-test=renderFav]')).toBeTruthy()
  })
})
