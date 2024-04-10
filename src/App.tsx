import React, {useState} from 'react';
import "./App.scss"
import "bootstrap/dist/css/bootstrap.min.css"
import {Container, Row} from "react-bootstrap";
import Navbar from "./components/Navbar/Navbar";
import {useAppDispatch, useAppSelector} from "./hooks/reduxHooks";
import Board from "./components/Board/Board";
import BreadCrumb from "./components/BreadCrumb/BreadCrumb";
import {IssuesCategories, setIssues} from "./redux/slices/userIssuesSlice";
import {DndContext, DragEndEvent, DragOverEvent, DragStartEvent} from "@dnd-kit/core";
import {SortableContext, useSortable} from "@dnd-kit/sortable"
import {IRepoIssue} from "./models/RepoModels";

function App() {
    const dispatch = useAppDispatch()
    const userIssues = useAppSelector(state => state.userIssues)

    const [activeBoardId, setActiveBoardId] = useState<string | null>(null)

    function handleDragEnd(event: DragEndEvent) {
        if(event.active.data.current && event.over) {
            const issue = event.active.data.current.issue
            const fromBoard = event.active.data.current.currentBoard as IssuesCategories
            const toBoard = event.over.id as IssuesCategories

            // console.log(toBoard)
            // console.log(fromBoard)

            // console.log(`From: ${event.active.data.current.currentBoard}`)
            dispatch(setIssues({
                category: fromBoard,
                issues: userIssues[fromBoard].filter(item => item.number !== issue.number)
            })) // from

            dispatch(setIssues({
                category: toBoard,
                issues: [...userIssues[toBoard], issue]
            })) // to
        }
    }

    const [activeIssue, setActiveIssue] = useState<IRepoIssue | null>(null)

    function handleDragStart(event: DragStartEvent) {

        if (event.active.data.current?.type === "Issue") {
            setActiveIssue(event.active.data.current.task);
            return;
        }
    }

    function handleDragOver(event: DragOverEvent) {
        const { active, over } = event;
        if (!over) return;

        console.log(over.data.current?.type)

        const isOverColumn = over.data.current?.type === "Board";
        const isActiveTask = active.data.current?.type === "Issue";

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        // Im dropping a Task over a column
        if (isActiveTask && isOverColumn) {
            // dispatch(setIssues({category: event.active.data}))
            // setTasks((tasks) => {
            //     const activeIndex = tasks.findIndex((t) => t.id === activeId);
            //
            //     tasks[activeIndex].columnId = overId;
                console.log("DROPPING TASK OVER COLUMN");
                // return arrayMove(tasks, activeIndex, activeIndex);
            // });
        }
    }

    return (
            <div className="App">
                <Container className="mt-3" fluid>
                    <Navbar/>
                    <BreadCrumb/>

                    <DndContext onDragOver={handleDragOver} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                        <Row className="mt-4" xs={3}>
                            {/* mapping through enum keys so app could contain as many boards as possible */}
                            {/*<SortableContext items={Object.keys(IssuesCategories) as Array<keyof typeof IssuesCategories>}>*/}
                                {(Object.keys(IssuesCategories) as Array<keyof typeof IssuesCategories>).map(category =>
                                    <Board category={category} key={category}/>
                                )}
                            {/*</SortableContext>*/}
                        </Row>
                    </DndContext>

                </Container>
            </div>
    );
}

export default App;
