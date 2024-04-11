import {addIssue, filterIssue} from './dnd-utils';
import {IRepoIssue} from "../../models/RepoModels";

const mockIssue1: IRepoIssue = {
    title: 'Issue 1',
    comments: 3,
    created_at: '2024-04-11T10:00:00Z',
    number: 1,
    state: 'open',
    user: {
        login: 'user1',
    },
};

const mockIssue2: IRepoIssue = {
    title: 'Issue 2',
    comments: 5,
    created_at: '2024-04-10T12:00:00Z',
    number: 2,
    state: 'closed',
    user: {
        login: 'user2',
    },
};

describe('addIssue function', () => {
    test('adds issue at specified index when originalIndex is null', () => {
        const issues = [mockIssue1, mockIssue2];
        const newIssue: IRepoIssue = {
            title: 'New Issue',
            comments: 0,
            created_at: '2024-04-11T14:00:00Z',
            number: 3,
            state: 'open',
            user: {
                login: 'user3',
            },
        };
        const index = 0;
        const originalIndex = null;

        const updatedIssues = addIssue(issues, newIssue, index, originalIndex);

        expect(updatedIssues).toHaveLength(3);
        expect(updatedIssues[index+1]).toEqual(newIssue);
    });

    test('adds issue at specified index when originalIndex is less than or equal to index', () => {
        const issues = [mockIssue1, mockIssue2];
        const newIssue: IRepoIssue = {
            title: 'New Issue',
            comments: 0,
            created_at: '2024-04-11T14:00:00Z',
            number: 3,
            state: 'open',
            user: {
                login: 'user3',
            },
        };
        const index = 1;
        const originalIndex = 0;

        const updatedIssues = addIssue(issues, newIssue, index, originalIndex);

        expect(updatedIssues).toHaveLength(3);
        expect(updatedIssues[index]).toEqual(newIssue);
    });

    test('adds issue at specified index when originalIndex is greater than index', () => {
        const issues = [mockIssue1, mockIssue2];
        const newIssue: IRepoIssue = {
            title: 'New Issue',
            comments: 0,
            created_at: '2024-04-11T14:00:00Z',
            number: 3,
            state: 'open',
            user: {
                login: 'user3',
            },
        };
        const index = 0;
        const originalIndex = 1;

        const updatedIssues = addIssue(issues, newIssue, index, originalIndex);

        expect(updatedIssues).toHaveLength(3);
        expect(updatedIssues[index+1]).toEqual(newIssue);
    });
});

describe("filterIssue function", () => {
    test("removes issue from an array", () => {
        const issues = [mockIssue1, mockIssue2]

        const filteredIssues = filterIssue(issues, mockIssue1.number)

        expect(filteredIssues[0]).toEqual(mockIssue2)
    })
})