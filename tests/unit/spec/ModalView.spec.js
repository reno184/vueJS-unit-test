import { mount } from '@vue/test-utils'
import comp from '@/components/ModalView'
import { useKeydown } from '@/composition/useKeydown'
describe('[Mail module] modal - wrapper ', function () {
  const closeModal = jest.fn()
  const wrapper = mount(comp, {
    props: {
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
  it('should close the modal when overlay is clicked', async function () {
    const btnClose = wrapper.get('[data-test=pnlOverlay]')
    expect(btnClose).toBeTruthy()
    await btnClose.trigger('click')
    expect(closeModal.mock.calls).toHaveLength(1)
  })
})
