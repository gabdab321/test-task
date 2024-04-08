import axios from 'axios'
import GitAPI from './GitAPI'
import {IRepo, IRepoIssue} from "../models/RepoModels";

jest.mock('axios')

describe('GitAPI', () => {
    describe('getRepoIssues', () => {
        it('fetches repo issues successfully', async () => {
            const mockResponse:IRepoIssue[] = [
                { title: 'Issue 1', comments: 5, created_at: '2024-04-08', number: 1, state: 'open', user: { login: 'user1' } },
                { title: 'Issue 2', comments: 3, created_at: '2024-04-07', number: 2, state: 'closed', user: { login: 'user2' } }
            ];

            (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({ status: 200, data: mockResponse })

            const issues = await GitAPI.getRepoIssues('https://github.com/facebook/react')

            expect(issues).toEqual(mockResponse)
        })

        it('handles fetch error gracefully', async () => {
            (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce(new Error('Failed to fetch issues'))

            const issues = await GitAPI.getRepoIssues('https://github.com/facebook/react')

            expect(issues).toBeNull()
        })
    })

    describe('getRepo', () => {
        it('fetches repo successfully', async () => {
            const mockResponse: IRepo = {
                id: 123,
                private: false,
                stargazers_count: 1000,
                name: 'react',
                owner: { login: 'facebook' }
            };

            (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({ status: 200, data: mockResponse })

            const repo = await GitAPI.getRepo('https://github.com/facebook/react')

            expect(repo).toEqual(mockResponse)
        })

        it('handles fetch error gracefully', async () => {
            (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce(new Error('Failed to fetch repo'))

            const repo = await GitAPI.getRepo('https://github.com/facebook/react')

            expect(repo).toBeNull()
        })
    })
})