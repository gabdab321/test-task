import React, {Dispatch} from 'react';
import {Col, Row} from "react-bootstrap";
import BoardItem from "../BoardItem/BoardItem";
import "./Board.scss"
import {IssuesCategories} from "../../redux/slices/userIssuesSlice";
import {useAppSelector} from "../../hooks/reduxHooks";

interface BoardProps {
    category: keyof typeof IssuesCategories
}

const Board = ({category}: BoardProps) => {
    const userIssues = useAppSelector(state => state.userIssues)

    return (
        <Col className="text-center fw-bold">
            {IssuesCategories[category]}
                <Row className="m-1 justify-content-center board">
                    {userIssues[IssuesCategories[category]].map(issue =>
                        <BoardItem currentBoard={IssuesCategories[category]} issue={issue} key={issue.number}/>
                    )}
                </Row>
        </Col>
    );
};

export default Board;