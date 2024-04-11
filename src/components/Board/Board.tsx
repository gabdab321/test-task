import React from 'react';
import {Col, Row} from "react-bootstrap";
import BoardItem from "../BoardItem/BoardItem";
import "./Board.scss"
import {IssuesCategories, setIssues} from "../../redux/slices/userIssuesSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import "../KanbanBoard/KanbanBoard.scss"
import {IRepoIssue} from "../../models/RepoModels";
import {addIssue, filterIssue} from "../../utils/dnd-utils/dnd-utils";

interface BoardProps {
    category: IssuesCategories
}

const Board = ({category}: BoardProps) => {
    const issues = useAppSelector(state => state.userIssues)
    const dispatch = useAppDispatch()

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        const target = (e.target as HTMLDivElement)
        if(target.closest(".kanban-item")) {
            (target.closest(".kanban-item") as HTMLDivElement).style.boxShadow = "-1px 7px 7px 1px rgba(0,0,0,0.75)"
        }
        if(target.classList.contains("kanban-top")) {
            target.style.boxShadow = "-1px 7px 7px 1px rgba(0,0,0,0.75)"
        }
        if(target.classList.contains("board")) {
            target.style.boxShadow = "0px 0px 45px -2px rgba(0,0,0,0.5) inset"
        }
    };

    const onDragLeave = (e: React.DragEvent) => {
        (e.target as HTMLDivElement).style.boxShadow = "none"
    }

    const KANBAN_ITEM = "kanban-item";
    const KANBAN_TOP = "kanban-top";

    const onDrop = (e: React.DragEvent, category: IssuesCategories) => {
        e.preventDefault();
        const target = e.target as HTMLDivElement;
        const closestItem = target.closest(".kanban-item") as HTMLDivElement
        /* remove box shadow effect */
        closestItem ? closestItem.style.boxShadow = "none" : target.style.boxShadow = "none"

        /* retrieve dragged issue and its original category */
        const issue: IRepoIssue = JSON.parse(e.dataTransfer.getData('issue'));
        const oldCategory: IssuesCategories = e.dataTransfer.getData('oldCategory') as IssuesCategories;

        /* determine the issue over which the drop occurred and its index */
        const dropOverIssueId = closestItem ? closestItem.dataset["issueId"] : undefined;
        const dropOverIssueIndex = dropOverIssueId ? issues[category].findIndex(item => item.number === +dropOverIssueId) : undefined;


        let newIssues;
        if (oldCategory === category) {
            /* if the drop occurs within the same category */
            const filteredIssues = filterIssue(issues[category], issue.number);
            const isKanbanItem = closestItem ? closestItem.classList.contains(KANBAN_ITEM) : target.classList.contains(KANBAN_ITEM)
            if (isKanbanItem && dropOverIssueIndex !== undefined) {
                /* reorder the issues if dropped over an existing item */
                const originalIndex = issues[category].findIndex(item => item.number === issue.number);
                newIssues = addIssue(filteredIssues, issue, dropOverIssueIndex, originalIndex);
            } else if (target.classList.contains(KANBAN_TOP)) {
                /*  add the issue to the top if dropped over the top line */
                newIssues = [issue, ...filteredIssues];
            } else {
                /* add the issue to the bottom otherwise */
                newIssues = [...filteredIssues, issue];
            }
        } else {
            /* if the drop occurs in a different category */
            const filteredOldIssues = filterIssue(issues[oldCategory], issue.number);
            /* remove the issue from its original category */
            dispatch(setIssues({ category: oldCategory, issues: filteredOldIssues }));

            const isKanbanItem = closestItem ? closestItem.classList.contains(KANBAN_ITEM) : target.classList.contains(KANBAN_ITEM)
            if (isKanbanItem && dropOverIssueIndex !== undefined) {
                /* add the issue to the new category at the specified index */
                newIssues = addIssue(issues[category], issue, dropOverIssueIndex, null);
            } else if (target.classList.contains(KANBAN_TOP)) {
                /* add the issue to the top of the new category */
                newIssues = [issue, ...issues[category]];
            } else {
                /* add the issue to the bottom of the new category */
                newIssues = [...issues[category], issue];
            }
        }
        /* update the state with the new issues configuration */
        dispatch(setIssues({ category, issues: newIssues }));
    };

    return (
        <Col
            onDragOver={e => onDragOver(e)}
            onDrop={e => onDrop(e, category)}

            className="text-center fw-bold kanban-column"
        >
            {category}
            <div className="kanban-top" onDragLeave={e => onDragLeave(e)}/>
                <Row className="m-1 board" onDragLeave={e => onDragLeave(e)}>
                    {issues[category].map(issue =>
                        <BoardItem category={category} issue={issue} key={issue.number}/>
                    )}
                </Row>
        </Col>
    );
};

export default Board;