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

const userIssues = localStorage.getItem("userIssues")

/* parse issues data from localstorage if possible */
const userIssuesState: userIssuesState = userIssues ? JSON.parse(userIssues) : {
    [IssuesCategories.TODO]: [],
    [IssuesCategories.PROGRESS]: [],
    [IssuesCategories.DONE]: [],
}

type SetIssuesPayload = { category: IssuesCategories, issues: IRepoIssue[] }

const userIssuesSlice = createSlice({
    name: "userIssuesSlice",
    initialState: userIssuesState,
    reducers: {
        setIssues(state: userIssuesState, action: PayloadAction<SetIssuesPayload>) {
            state[action.payload.category] = action.payload.issues
        }
    }
})

export const userIssuesReducer = userIssuesSlice.reducer
export const {setIssues} = userIssuesSlice.actions