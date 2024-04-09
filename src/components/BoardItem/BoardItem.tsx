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
    //
    // function dragOverHandler(e: any) {
    //     e.preventDefault()
    //     if(e.target.className.includes("board_item")) {
    //         e.target.style.boxShadow = "0 4px 3px gray"
    //     }
    // }
    //
    // function dragLeaveHandler(e: any) {
    //     e.target.style.boxShadow = "none"
    // }
    //
    // function dragStartHandler(e: any, board: any, item: any) {
    //     setCurrentBoard(board)
    //     setCurrentIssue(issue)
    // }
    //
    // function dragEndHandler(e: any) {
    //     e.target.style.boxShadow = "none"
    // }
    //
    // function dropHandler(e: React.DragEvent<HTMLElement>, board: any, item: any) {
    //     e.preventDefault()
    //     const currentIndex = currentBoard.issues.indexOf(issues)
    // }

    const dispatch = useAppDispatch()
    const userIssues = useAppSelector(state => state.userIssues)

    function handleCock(to: IssuesCategories) {
        dispatch(setIssues({category: to, issues: [...userIssues[to], issue] }))
        dispatch(setIssues({category: currentBoard, issues: userIssues[currentBoard].filter(item => item.number !== issue.number) }))
    }

    return (
        <Card
            // onDragOver={e => dragOverHandler(e)}
            // onDragLeave={e => dragLeaveHandler(e)}
            // onDragStart={e => dragStartHandler(e, board, issue)}
            // onDragEnd={e => dragEndHandler(e)}
            // onDrop={e => dropHandler(e, board, issue)}
            draggable={true}
            className="text-start m-2 board_item"
        >
            <Card.Body>
                <Card.Title>{issue.title}</Card.Title>
                <Card.Text className="fw-lighter mb-2">
                    #{issue.number} {issue.created_at}
                </Card.Text>
                <Card.Text className="fw-lighter">{issue.user.login} | Comments: {issue.comments}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <Row>
                    <Col>
                        <Button onClick={() => handleCock(IssuesCategories.TODO)}>ToDo</Button>
                    </Col>
                    <Col>
                        <Button onClick={() => handleCock(IssuesCategories.PROGRESS)}>InProgress</Button>
                    </Col>
                    <Col>
                        <Button onClick={() => handleCock(IssuesCategories.DONE)}>Done</Button>
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    );
};

export default BoardItem;