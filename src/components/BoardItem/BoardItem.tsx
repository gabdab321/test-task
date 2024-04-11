import React, {useState} from 'react';
import {Button, Card, Col, Row} from "react-bootstrap";
import {IRepoIssue} from "../../models/RepoModels";
import "./BoardItem.scss"
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {IssuesCategories, setIssues} from "../../redux/slices/userIssuesSlice";

interface IBoardItemProps {
    issue: IRepoIssue
    category: IssuesCategories

}

const BoardItem = ({category, issue}: IBoardItemProps) => {
    const [draggedIssue, setDraggedIssue] = useState<IRepoIssue | null>(null)

    const onDragStart = (event: React.DragEvent, category: IssuesCategories, issue: IRepoIssue) => {
        event.dataTransfer.setData('issue', JSON.stringify(issue));
        event.dataTransfer.setData('oldCategory', category);
        setDraggedIssue(issue);
    };

    const onDragEnd = (e: React.DragEvent) => {
        setDraggedIssue(null);
    };

    const onDragLeave = (e: React.DragEvent) => {
        (e.target as HTMLDivElement).style.boxShadow = "none"
    }

    return (
            <Card
                className="text-start m-2 kanban-item"
                draggable
                data-issue-id={issue.number}
                onDragLeave={e => onDragLeave(e)}
                onDragEnd={e => onDragEnd(e)}
                onDragStart={(event) => onDragStart(event, category, issue)}
            >
                <Card.Body>
                    <Card.Title>{issue.title}</Card.Title>
                    <Card.Text className="fw-lighter mb-2">
                        #{issue.number} {issue.created_at}
                    </Card.Text>
                    <Card.Text className="fw-lighter">{issue.user.login} | Comments: {issue.comments}</Card.Text>
                </Card.Body>
            </Card>

    );
};

export default BoardItem;