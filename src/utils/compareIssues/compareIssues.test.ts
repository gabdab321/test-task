import {compareIssues} from "./compareIssues";
import {IRepoIssue} from "../../models/RepoModels";

describe('compareIssues function', () => {
    test('returns empty array when arr1 is empty', () => {
        const arr1: IRepoIssue[] = []
        const arr2: IRepoIssue[] = [
            { title: "Issue 1", comments: 0, created_at: "2024-04-10", number: 1, state: "open", user: { login: "user1" } }
        ]
        const result = compareIssues(arr1, arr2)
        expect(result).toEqual([])
    })

    test('returns all issues from arr1 when arr2 is empty', () => {
        const arr1: IRepoIssue[] = [
            { title: "Issue 1", comments: 0, created_at: "2024-04-10", number: 1, state: "open", user: { login: "user1" } },
            { title: "Issue 2", comments: 0, created_at: "2024-04-09", number: 2, state: "closed", user: { login: "user2" } }
        ]
        const arr2: IRepoIssue[] = []
        const result = compareIssues(arr1, arr2)
        expect(result).toEqual(arr1)
    });

    test('returns empty array when both arrays have the same issues', () => {
        const arr1: IRepoIssue[] = [
            { title: "Issue 1", comments: 0, created_at: "2024-04-10", number: 1, state: "open", user: { login: "user1" } },
            { title: "Issue 2", comments: 0, created_at: "2024-04-09", number: 2, state: "closed", user: { login: "user2" } }
        ]
        const arr2: IRepoIssue[] = [
            { title: "Issue 1", comments: 0, created_at: "2024-04-10", number: 1, state: "open", user: { login: "user1" } },
            { title: "Issue 2", comments: 0, created_at: "2024-04-09", number: 2, state: "closed", user: { login: "user2" } }
        ]
        const result = compareIssues(arr1, arr2)
        expect(result).toEqual([])
    });

    test('returns issues from arr1 not present in arr2', () => {
        const arr1: IRepoIssue[] = [
            { title: "Issue 1", comments: 0, created_at: "2024-04-10", number: 1, state: "open", user: { login: "user1" } },
            { title: "Issue 2", comments: 0, created_at: "2024-04-09", number: 2, state: "closed", user: { login: "user2" } }
        ]
        const arr2: IRepoIssue[] = [
            { title: "Issue 1", comments: 0, created_at: "2024-04-10", number: 1, state: "open", user: { login: "user1" } }
        ]
        const result = compareIssues(arr1, arr2)
        expect(result).toEqual([{ title: "Issue 2", comments: 0, created_at: "2024-04-09", number: 2, state: "closed", user: { login: "user2" } }])
    });
});
