import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async () => {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
        if (!res.ok) throw new Error("Couldn't fetch posts")
        return await res.json()
    }
)

const postsSlice = createSlice({
    name: 'post',
    initialState: {
        data: null,
        status: '',
        error: null,
        allPosts: []
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchPosts.pending, state => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.allPosts = action.payload
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message;
            })
    }
})

export default postsSlice.reducer;