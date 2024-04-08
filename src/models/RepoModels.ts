export interface IRepoIssue {
    title: string
    comments: number
    created_at: string
    number: number
    state: string
    user: {
        login: string
    }
}

export interface IRepo {
    id: number
    private: boolean
    stargazers_count: number
    name: string
    owner: {
        login: string
    }
}