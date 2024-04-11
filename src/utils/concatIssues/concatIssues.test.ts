import {concatIssues} from "./concatIssues";
import {IssuesCategories, userIssuesState} from "../../redux/slices/repoSlice";
import {IRepoIssue} from "../../models/RepoModels";

describe('concatIssues function', () => {
    // Mock user issues data
    const userIssues: userIssuesState = {
        [IssuesCategories.TODO]: [
            { title: 'Issue 1', comments: 3, created_at: '2024-04-11', number: 1, state: 'open', user: { login: 'user1' } },
            { title: 'Issue 2', comments: 2, created_at: '2024-04-10', number: 2, state: 'closed', user: { login: 'user2' } }
        ],
        [IssuesCategories.PROGRESS]: [
            { title: 'Issue 3', comments: 1, created_at: '2024-04-09', number: 3, state: 'open', user: { login: 'user3' } }
        ],
        [IssuesCategories.DONE]: [
            { title: 'Issue 4', comments: 0, created_at: '2024-04-08', number: 4, state: 'closed', user: { login: 'user4' } }
        ]
    }

    it('should concatenate all user issues into one array', () => {
        const result = concatIssues(userIssues)
        const expected: IRepoIssue[] = [
            { title: 'Issue 1', comments: 3, created_at: '2024-04-11', number: 1, state: 'open', user: { login: 'user1' } },
            { title: 'Issue 2', comments: 2, created_at: '2024-04-10', number: 2, state: 'closed', user: { login: 'user2' } },
            { title: 'Issue 3', comments: 1, created_at: '2024-04-09', number: 3, state: 'open', user: { login: 'user3' } },
            { title: 'Issue 4', comments: 0, created_at: '2024-04-08', number: 4, state: 'closed', user: { login: 'user4' } }
        ]
        expect(result).toEqual(expected)
    })
})
