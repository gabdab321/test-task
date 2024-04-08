import axios from "axios";
export default class GitAPI {
    static async getRepoIssues(repoUrl: string) {
        const repoUrlSliced = repoUrl.split("/")
        const repoOwner = repoUrlSliced[repoUrlSliced.length - 2]
        const repoName = repoUrlSliced[repoUrlSliced.length - 1]

        try {
            const response = await axios.get(`https://api.github.com/repos/${repoOwner}/${repoName}/issues`);
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error('Failed to fetch issues:', error);
            throw error;
        }
    }

    static async getRepo(repoUrl: string) {
        const repoUrlSliced = repoUrl.split("/")
        const repoOwner = repoUrlSliced[repoUrlSliced.length - 2]
        const repoName = repoUrlSliced[repoUrlSliced.length - 1]

        try {
            const response = await axios.get(`https://api.github.com/repos/${repoOwner}/${repoName}`);
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error('Failed to fetch issues:', error);
            throw error;
        }
    }
}