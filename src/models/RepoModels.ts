export interface RepoIssue {
    title: string
    comments: number
    created_at: string
    number: number
    state: string
    user: {
        login: string
    }
}

export interface Repo {
    id: number
    private: boolean
    stargazers_count: number
}