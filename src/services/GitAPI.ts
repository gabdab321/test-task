import axios from "axios";
import {IRepo, IRepoIssue} from "../models/RepoModels";
export default class GitAPI {
    static async getRepoIssues(repoUrl: string): Promise<IRepoIssue[] | null> {
        const repoUrlSliced = repoUrl.split("/")
        const repoOwner = repoUrlSliced[repoUrlSliced.length - 2]
        const repoName = repoUrlSliced[repoUrlSliced.length - 1]

        try {
            const response = await axios.get(`https://api.github.com/repos/${repoOwner}/${repoName}/issues`)

            if(response.status != 200) return null

            return response.data
        } catch (error) {
            console.log("Failed to fetch issues:", error)
            return null
        }
    }

    static async getRepo(repoUrl: string): Promise<IRepo | null> {
        const repoUrlSliced = repoUrl.split("/")
        const repoOwner = repoUrlSliced[repoUrlSliced.length - 2]
        const repoName = repoUrlSliced[repoUrlSliced.length - 1]

        try {
            const response = await axios.get(`https://api.github.com/repos/${repoOwner}/${repoName}`)

            if(response.status != 200) return null

            return response.data
        } catch (error) {
            console.log("Failed to fetch repo:", error)
            return null
        }
    }
}