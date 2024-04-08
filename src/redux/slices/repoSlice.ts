import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IRepo, IRepoIssue} from "../../models/RepoModels";

export interface repoState {
    repo: IRepo
    issues: IRepoIssue[]
}

const repoState: repoState =  {
    repo: {
        private: false,
        id: 0,
        stargazers_count: 0,
        name: "something",
        owner: {login: "enter"}
    },
    issues: []
}

const repoSlice = createSlice({
    name: "repoSlice",
    initialState: repoState,
    reducers: {
        setRepo(state: repoState, action: PayloadAction<IRepo>) {
            state.repo = action.payload
        },
        setRepoIssues(state: repoState, action: PayloadAction<IRepoIssue[]>) {
            state.issues = action.payload
        }
    }
})

export const repoReducer = repoSlice.reducer
export const {setRepo, setRepoIssues} = repoSlice.actions