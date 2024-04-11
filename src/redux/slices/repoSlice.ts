import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IRepo, IRepoIssue} from "../../models/RepoModels";

export enum IssuesCategories {
    TODO = "ToDo",
    PROGRESS = "InProgress",
    DONE = "Done"
}

export type userIssuesState = {
    [key in IssuesCategories]: IRepoIssue[]
}

export interface repoState {
    repo: IRepo
    userIssues: userIssuesState
}

const repoState: repoState =  {
    repo: {
        private: false,
        id: 0,
        stargazers_count: 0,
        name: "something",
        owner: {login: "enter"}
    },
    userIssues: {
        [IssuesCategories.TODO]: [],
        [IssuesCategories.PROGRESS]: [],
        [IssuesCategories.DONE]: [],
    }
}

type SetIssuesPayload = { category: IssuesCategories, issues: IRepoIssue[]}

export interface localStorageIssues { repoId: number, issues: userIssuesState }

const repoSlice = createSlice({
    name: "repoSlice",
    initialState: repoState,
    reducers: {
        setRepo(state: repoState, action: PayloadAction<IRepo>) {
            state.repo = action.payload
        },
        /* sets issues by category */
        setIssues(state: repoState, action: PayloadAction<SetIssuesPayload>) {
            state.userIssues[action.payload.category] = action.payload.issues
            /* trying to get issues from localStorage */
            const oldLocalData = localStorage.getItem("userIssues")
            const oldUserIssues: localStorageIssues[] | null = oldLocalData ? JSON.parse(oldLocalData) : null

            /* if there are some recordings in localStorage about this repo's issues */
            if(oldUserIssues) {
                /* all repo's issues recordings from localStorage except the current repo */
                const filteredRepoIssues = oldUserIssues.filter(issue => issue.repoId !== state.repo.id)

                /* committing changes to localStorage */
                localStorage.setItem(`userIssues`, JSON.stringify([
                    ...filteredRepoIssues, // spreading filteredIssues, so we don't erase them from localStorage
                    {repoId: state.repo.id, issues: state.userIssues} // and adding current one but with all changes user made
                ]))
            }
        },
        /* sets whole userIssues object */
        setUserIssues(state: repoState, action: PayloadAction<userIssuesState>) {
            state.userIssues = action.payload
        }
    }
})

export const repoReducer = repoSlice.reducer
export const {setRepo, setIssues, setUserIssues} = repoSlice.actions