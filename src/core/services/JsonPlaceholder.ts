export async function getPostId (postId: number): Promise<{ id: number}> {
  const result = await fetch('https://jsonplaceholder.typicode.com/posts/' + postId)
  const post = await result.json()
  return { id: post.id }
}
