import React from 'react';
import {Col, Row} from "react-bootstrap";
import {IRepoIssue} from "../../models/RepoModels";
import BoardItem from "../BoardItem/BoardItem";
import "./Board.scss"

interface BoardProps {
    title: string,
    issues: IRepoIssue[]
}

const Board = ({title, issues}: BoardProps) => {
    return (
        <Col className="text-center fw-bold">
            {title}
            <Row className="m-1 justify-content-center board" >
                {issues.map(issue => <BoardItem issue={issue} key={issue.number}/>)}
            </Row>
        </Col>
    );
};

export default Board;