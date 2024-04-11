import {IRepoIssue} from "../../models/RepoModels";

// TODO: write tests

/* util to filter out(delete) issue from ana array of issues */
export const filterIssue = (issues: IRepoIssue[], issueNumber: number) => issues.filter(item => item.number !== issueNumber);

/**
 * util to add an issue into an array of issues at a specified index
 * @param {IRepoIssue[]} issues - array of issues
 * @param {IRepoIssue} issue - the issue to be added
 * @param {number} index - the index at which the issue should be added
 * @param {number | null} originalIndex - the original index of the issue
 * @returns {IRepoIssue[]} - Array of issues with the new issue added
 */
export const addIssue = (issues: IRepoIssue[], issue: IRepoIssue, index: number, originalIndex: number | null): IRepoIssue[] => {
    /* if drop happens on other board */
    if(originalIndex === null) {
        return [...issues.slice(0, index + 1), issue, ...issues.slice(index + 1)]
    }

    /* if drop happens on the same board */
    if (originalIndex <= index) {
        return [...issues.slice(0, index), issue, ...issues.slice(index)];
    } else {
        return [...issues.slice(0, index + 1), issue, ...issues.slice(index + 1)];
    }
};