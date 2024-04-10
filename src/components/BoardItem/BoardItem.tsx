import React from 'react';
import {Button, Card, Col, Row} from "react-bootstrap";
import {IRepoIssue} from "../../models/RepoModels";
import "./BoardItem.scss"
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {IssuesCategories, setIssues} from "../../redux/slices/userIssuesSlice";

interface IBoardItemProps {
    issue: IRepoIssue
    currentBoard: IssuesCategories
}

const BoardItem = ({currentBoard, issue}: IBoardItemProps) => {
    const dispatch = useAppDispatch()
    const userIssues = useAppSelector(state => state.userIssues)

    // function handleClick(to: IssuesCategories) {
    //     dispatch(setIssues({category: to, issues: [...userIssues[to], issue] }))
    //     dispatch(setIssues({category: currentBoard, issues: userIssues[currentBoard].filter(item => item.number !== issue.number) }))
    // }

    return (
            <Card
                className="text-start m-2 board_item"
                draggable={true}
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