import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IRepoIssue} from "../../models/RepoModels";

export enum IssuesCategories {
    TODO = "ToDo",
    PROGRESS = "InProgress",
    DONE = "Done"
}
type userIssuesState = {
    [key in IssuesCategories]: IRepoIssue[]
}

export type LocalStorageIssues = [
    { repoId: number, issues: userIssuesState }
]

let localStorageData = localStorage.getItem("userIssues")
const localStorageIssues: LocalStorageIssues | null = localStorageData ? JSON.parse(localStorageData) : null

/* parse issues data from localstorage if possible */
const userIssuesState: userIssuesState = localStorageIssues ? localStorageIssues : {
    [IssuesCategories.TODO]: [],
    [IssuesCategories.PROGRESS]: [],
    [IssuesCategories.DONE]: [],
}

type SetIssuesPayload = { category: IssuesCategories, issues: IRepoIssue[], repoId: number }

const userIssuesSlice = createSlice({
    name: "userIssuesSlice",
    initialState: userIssuesState,
    reducers: {
        setIssues(state: userIssuesState, action: PayloadAction<SetIssuesPayload>) {
            state[action.payload.category] = action.payload.issues

            const repoId = action.payload.repoId

            const otherIssuelocalStorageIssues[repoId]
            localStorage.setItem("userIssues")
            const abc = [
                {}
                {repoId: state}
            ]
        }
    }
})

export const userIssuesReducer = userIssuesSlice.reducer
export const {setIssues} = userIssuesSlice.actions