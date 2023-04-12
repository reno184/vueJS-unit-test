import { getPostId } from '@/core/services/JsonPlaceholder'
import fetchMock from 'jest-fetch-mock'

describe('Ajax provider', function () {
/*  let postId: {id: number} = { id: -1 }
  beforeEach(async () => {

  }) */

  it('Then the correct average should be returned', async () => {
    const postId = await getPostId(7)
    expect(postId).toEqual({ id: 7 })
  })
})

describe('Ajax fake provider', function () {
  const fakeResponse = { id: 7 }
  beforeEach(async () => {
    fetchMock.mockResponseOnce(JSON.stringify(fakeResponse))
  })
  it('Then the correct average should be returned g', async () => {
    expect(await getPostId(6)).toEqual({ id: 7 })
  })
})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
/*
global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => Promise.resolve({ id: 2 })
  })
})

it('test fetch', async () => {
  const call = await getPostId(2)
  expect(call).toEqual({ id: 2 })
  expect(fetch).toHaveBeenCalledTimes(1)
})
*/
