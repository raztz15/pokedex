import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Post {
    id: number;
    title: string;
    body: string;
}

export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
    endpoints: builder => ({
        getPosts: builder.query<Post[], void>({
            query: () => '/posts'
        }),

        addPost: builder.mutation<Post, Partial<Post>>({
            query: newPost => ({
                url: '/posts',
                method: 'POST',
                body: newPost,
            })
        })
    })
})

export const { useGetPostsQuery, useAddPostMutation } = postsApi;