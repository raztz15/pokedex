import { useGetPostsQuery } from '../apis/Posts.api'

export const Posts = () => {
    const { data, error, isLoading } = useGetPostsQuery()

    if (isLoading) return <h1>Loading...</h1>
    if (error) return <h2>Error loading posts</h2>
    if (!data) return null;

    return (
        <div>{data.map(post => <div key={post.id}><h2>Title: {post.title}</h2><div>{post.body}</div></div>)}</div>
    )
}
