import {IRepoIssue} from "../../models/RepoModels";

export function compareIssues(arr1: IRepoIssue[], arr2: IRepoIssue[]): IRepoIssue[] {
    const differenceArray: IRepoIssue[] = [];

    const numbersSet = new Set(arr2.map(issue => issue.number));

    arr1.forEach((issue) => {
        // check if we have current issue in array 2
        if (!numbersSet.has(issue.number)) {
            // if issue wasn't found, then we adding it to differenceArray
            differenceArray.push(issue);
        }
    });

    return differenceArray;
}