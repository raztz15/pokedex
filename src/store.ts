import { configureStore } from "@reduxjs/toolkit";
import userReucer from './slices/UserSlice'
import postReducer from './slices/PostsSlice'
import { postsApi } from "./apis/Posts.api";
import { pokemonApi } from "./apis/Pokemon.api"

export const store = configureStore({
    reducer: {
        user: userReucer,
        post: postReducer,
        [postsApi.reducerPath]: postsApi.reducer,
        [pokemonApi.reducerPath]: pokemonApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(postsApi.middleware)
            .concat(pokemonApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
