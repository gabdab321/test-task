import React, {Dispatch} from 'react';
import {Col, Row} from "react-bootstrap";
import BoardItem from "../BoardItem/BoardItem";
import "./Board.scss"
import {IssuesCategories} from "../../redux/slices/userIssuesSlice";
import {useAppSelector} from "../../hooks/reduxHooks";
import {DragOverlay, useDroppable} from "@dnd-kit/core";
import {SortableContext, useSortable} from "@dnd-kit/sortable";

interface BoardProps {
    category: keyof typeof IssuesCategories
}

const Board = ({category}: BoardProps) => {
    const userIssues = useAppSelector(state => state.userIssues)

    const {isOver, setNodeRef} = useDroppable({
        id: IssuesCategories[category]
    })

    return (
        <Col ref={setNodeRef}  className="text-center fw-bold">
            {IssuesCategories[category]}
                <Row
                    style={{backgroundColor: isOver ? "green" : "#CED4DA"}}
                    className="m-1 justify-content-center board"
                >
                    <SortableContext items={userIssues[IssuesCategories[category]].map(item => item.number)}>
                        {userIssues[IssuesCategories[category]].map(issue =>
                            <BoardItem currentBoard={IssuesCategories[category]} issue={issue} key={issue.number}/>
                        )}
                    </SortableContext>
                </Row>
        </Col>
    );
};

export default Board;