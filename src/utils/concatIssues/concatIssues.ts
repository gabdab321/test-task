import {IRepoIssue} from "../../models/RepoModels";
import {IssuesCategories, userIssuesState} from "../../redux/slices/repoSlice";

//TODO: write tests

// util to concat user issues into one array(used to search new issues)
export function concatIssues(userIssues: userIssuesState): IRepoIssue[] {
    let allIssues: IRepoIssue[] = []

    Object.keys(IssuesCategories).forEach(category => {
        allIssues = [...allIssues, ...userIssues[IssuesCategories[category as keyof typeof IssuesCategories]]]
    })

    return allIssues
}