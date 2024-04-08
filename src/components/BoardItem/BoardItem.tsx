import React from 'react';
import {Card, Button} from "react-bootstrap";
import {IRepoIssue} from "../../models/RepoModels";
import "./BoardItem.scss"

interface IBoardItemProps {
    issue: IRepoIssue
}

const BoardItem = ({issue}: IBoardItemProps) => {
    return (
        <Card className="text-start m-2 board_item">
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