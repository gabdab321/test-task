import React from 'react';
import {Button, Card, Col, Row} from "react-bootstrap";
import {IRepoIssue} from "../../models/RepoModels";
import "./BoardItem.scss"
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {IssuesCategories, setIssues} from "../../redux/slices/userIssuesSlice";
import {DragOverlay, useDraggable} from "@dnd-kit/core";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities"

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
    //
    // const {attributes, listeners, setNodeRef, transform} = useDraggable({
    //     id: issue.number
    // })

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: issue.number,
        data: {
            type: "Issue",
            issue,
            currentBoard
        },
    })


    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1
    };

    return (
            <Card
                style={style}
                {...listeners}
                {...attributes}
                ref={setNodeRef}
                className="text-start m-2 board_item"
            >
                <Card.Body>
                    <Card.Title>{issue.title}</Card.Title>
                    <Card.Text className="fw-lighter mb-2">
                        #{issue.number} {issue.created_at}
                    </Card.Text>
                    <Card.Text className="fw-lighter">{issue.user.login} | Comments: {issue.comments}</Card.Text>
                </Card.Body>
                {/*<Card.Footer>*/}
                {/*    <Row>*/}
                {/*        <Col>*/}
                {/*            <Button onClick={() => handleClick(IssuesCategories.TODO)}>ToDo</Button>*/}
                {/*        </Col>*/}
                {/*        <Col>*/}
                {/*            <Button onClick={() => handleClick(IssuesCategories.PROGRESS)}>InProgress</Button>*/}
                {/*        </Col>*/}
                {/*        <Col>*/}
                {/*            <Button onClick={() => handleClick(IssuesCategories.DONE)}>Done</Button>*/}
                {/*        </Col>*/}
                {/*    </Row>*/}
                {/*</Card.Footer>*/}
            </Card>

    );
};

export default BoardItem;