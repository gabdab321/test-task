import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {repoReducer} from "./slices/repoSlice";

const rootReducer = combineReducers({
    repo: repoReducer
})
export function setupStore(preloadedState?: Partial<RootState>) {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']