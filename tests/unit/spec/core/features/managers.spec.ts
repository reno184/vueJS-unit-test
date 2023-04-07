import { postManager } from '@/core/features/post/post.manager'
import fetchMock from 'jest-fetch-mock'
beforeEach(async () => {
  fetchMock.mockClear()
})
describe('Test API routes', () => {
  it('test API get list posts', function () {
    fetchMock.mockResponseOnce(JSON.stringify({}))
    postManager().list()
    expect(fetchMock).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts')
  })
})
