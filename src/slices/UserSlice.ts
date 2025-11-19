import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 1️⃣ יוצרים את ה-thunk
export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (userId) => {

        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!res.ok) throw new Error('Failed to fetch user');
        return await res.json();
    }
);

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!res.ok) throw new Error('Failed to fetch all users')
        return await res.json()
    }
)

// 2️⃣ יוצרים slice שמאזין ל-thunk
const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: null,
        status: 'idle', // 'loading' | 'succeeded' | 'failed'
        error: null,
        allUsers: []
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchUser.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchUsers.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.allUsers = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message
            })
    },
});

export default userSlice.reducer;
