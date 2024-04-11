import React, {useState} from 'react';
import {Card} from "react-bootstrap";
import {IRepoIssue} from "../../models/RepoModels";
import "./BoardItem.scss"
import {IssuesCategories} from "../../redux/slices/repoSlice";
import {formatDate} from "../../utils/formatDate/formatDate";

interface IBoardItemProps {
    issue: IRepoIssue
    category: IssuesCategories
}

const BoardItem = ({category, issue}: IBoardItemProps) => {
    /* used to highlight dragged element */
    const [isDragging, setIsDragging] = useState<boolean>(false)

    const onDragStart = (event: React.DragEvent, category: IssuesCategories, issue: IRepoIssue) => {
        /* setting data that will be transferred by DnD element */
        event.dataTransfer.setData('issue', JSON.stringify(issue));
        event.dataTransfer.setData('oldCategory', category);

        setIsDragging(true)
    };

    const onDragEnd = () => {
        setIsDragging(false);
    };

    const onDragLeave = (e: React.DragEvent) => {
        /* removes highlighting if current item were dragged over */
        (e.target as HTMLDivElement).style.boxShadow = "none"
    }

    return (
        <Card
            className={`text-start m-2 kanban-item ${isDragging ? "dragging" : ""}`}
            data-testid="board-item"
            draggable
            data-issue-id={issue.number}
            onDragLeave={e => onDragLeave(e)}
            onDragEnd={onDragEnd}
            onDragStart={(event) => onDragStart(event, category, issue)}
        >
            <Card.Body>
                <Card.Title>{issue.title}</Card.Title>
                <Card.Text className="fw-lighter mb-2">
                    #{issue.number} {formatDate(issue.created_at)}
                </Card.Text>
                <Card.Text className="fw-lighter">{issue.user.login} | Comments: {issue.comments}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default BoardItem;