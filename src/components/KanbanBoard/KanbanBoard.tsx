import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {IssuesCategories, setIssues} from "../../redux/slices/userIssuesSlice";
import "./KanbanBoard.scss"
import {IRepoIssue} from "../../models/RepoModels";

const KanbanBoard = () => {
    const issues = useAppSelector(state => state.userIssues)
    const dispatch = useAppDispatch();

    const [draggedIssue, setDraggedIssue] = useState<IRepoIssue | null>(null);

    const onDragStart = (event: React.DragEvent, category: IssuesCategories, issue: IRepoIssue) => {
        event.dataTransfer.setData('issue', JSON.stringify(issue));
        event.dataTransfer.setData('oldCategory', category);
        setDraggedIssue(issue);
    };

    const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        setDraggedIssue(null);
    };

    const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const target = (event.target as HTMLDivElement)
        if(target.classList.contains("kanban-item")) {
            target.style.boxShadow = "-1px 7px 7px 1px rgba(0,0,0,0.75)"
        }
        if(target.classList.contains("kanban-top")) {
            target.style.boxShadow = "-1px 7px 7px 1px rgba(0,0,0,0.75)"
        }
    };



    const KANBAN_ITEM = "kanban-item";
    const KANBAN_TOP = "kanban-top";

    const filterIssue = (issues: IRepoIssue[], issueNumber: number) => issues.filter(item => item.number !== issueNumber);

    const addIssue = (issues: IRepoIssue[], issue: IRepoIssue, index?: number, originalIndex?: number) => {
        if (index !== undefined && originalIndex !== undefined) {

            if (originalIndex <= index) {
                return [...issues.slice(0, index), issue, ...issues.slice(index)];
            } else {
                return [...issues.slice(0, index + 1), issue, ...issues.slice(index + 1)];
            }
        }
        return [...issues, issue];
    };

    const onDrop = (e: React.DragEvent, category: IssuesCategories) => {
        e.preventDefault();
        const target = e.target as HTMLDivElement;
        target.style.boxShadow = "none";

        const issue: IRepoIssue = JSON.parse(e.dataTransfer.getData('issue'));
        const oldCategory: IssuesCategories = e.dataTransfer.getData('oldCategory') as IssuesCategories;

        const dropOverIssueId = target.dataset["issueId"];
        const dropOverIssueIndex = dropOverIssueId ? issues[category].findIndex(item => item.number === +dropOverIssueId) : undefined;

        let newIssues;
        if (oldCategory === category) {
            const filteredIssues = filterIssue(issues[category], issue.number);
            if (target.classList.contains(KANBAN_ITEM) && dropOverIssueIndex !== undefined) {
                const originalIndex = issues[category].findIndex(item => item.number === issue.number);
                newIssues = addIssue(filteredIssues, issue, dropOverIssueIndex, originalIndex);
            } else if (target.classList.contains(KANBAN_TOP)) {
                newIssues = [issue, ...filteredIssues];
            } else {
                newIssues = [...filteredIssues, issue];
            }
        } else {
            const filteredOldIssues = filterIssue(issues[oldCategory], issue.number);
            dispatch(setIssues({ category: oldCategory, issues: filteredOldIssues }));

            if (target.classList.contains(KANBAN_ITEM) && dropOverIssueIndex !== undefined) {
                newIssues = addIssue(issues[category], issue, dropOverIssueIndex);
            } else if (target.classList.contains(KANBAN_TOP)) {
                newIssues = [issue, ...issues[category]];
            } else {
                newIssues = [...issues[category], issue];
            }
        }
        dispatch(setIssues({ category, issues: newIssues }));
    };


    const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        (e.target as HTMLDivElement).style.boxShadow = "none"
    }


    return (
        <div className="kanban-board">
            {Object.values(IssuesCategories).map((category) => (
                <div
                    key={category}
                    className="kanban-column"
                    onDragOver={onDragOver}
                    onDrop={(event) => onDrop(event, category)}
                >
                    <h2>{category}</h2>
                    <div className="kanban-top" onDragLeave={e => onDragLeave(e)}/>
                    {issues[category].map((issue) => (
                        <div
                            key={issue.number}
                            draggable
                            data-issue-id={issue.number} // needed for sorting in onDrop
                            className={`kanban-item ${draggedIssue === issue ? 'drag-over' : ''}`}
                            onDragLeave={e => onDragLeave(e)}
                            onDragEnd={e => onDragEnd(e)}
                            onDragStart={(event) => onDragStart(event, category, issue)}
                        >
                            #{issue.number} - {issue.title}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default KanbanBoard;