import React from 'react';
import {IssuesCategories} from "../../redux/slices/userIssuesSlice";
import "./KanbanBoard.scss"
import Board from "../Board/Board";

const KanbanBoard = () => {

    return (
        <div className="kanban-board">
            {Object.values(IssuesCategories).map((category) => (
                <Board category={category} key={category}/>
            ))}
        </div>
    );
};

export default KanbanBoard;