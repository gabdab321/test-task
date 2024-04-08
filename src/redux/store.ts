import {configureStore} from "@reduxjs/toolkit";
import {repoReducer} from "./slices/repoSlice";

const store = configureStore({
    devTools: true,
    reducer: {
        repo: repoReducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch