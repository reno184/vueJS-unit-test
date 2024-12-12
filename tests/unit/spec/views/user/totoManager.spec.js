import { CreateTodoManager } from '@/core/features/todos/createTodoManager'
import axios from 'axios'
import { it } from 'jest'
jest.mock('axios')

describe('Test module-manager : Todo', function () {
  it('should call fetch', async function () {
    const axiosProvider = jest.fn().mockResolvedValue({
      fetch: jest.fn(),
      delete: jest.fn()
    })
    const _t = CreateTodoManager(axiosProvider)
    axios.get.mockResolvedValue([
      {
        userId: 1,
        id: 1,
        title: 'delectus aut autem',
        completed: false
      }
    ])
    expect(await _t.fetch('toto'))
  })
})
