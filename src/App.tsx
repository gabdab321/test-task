import React, {useState} from 'react';
import "./App.scss"
import "bootstrap/dist/css/bootstrap.min.css"
import {Container, Row} from "react-bootstrap";
import Navbar from "./components/Navbar/Navbar";
import {useAppDispatch, useAppSelector} from "./hooks/reduxHooks";
import Board from "./components/Board/Board";
import BreadCrumb from "./components/BreadCrumb/BreadCrumb";
import {IssuesCategories, setIssues} from "./redux/slices/userIssuesSlice";
import BoardItem from "./components/BoardItem/BoardItem";
import KanbanBoard from "./components/KanbanBoard/KanbanBoard";

function App() {
    const dispatch = useAppDispatch()
    const userIssues = useAppSelector(state => state.userIssues)

    return (
            <div className="App">
                <Container className="mt-3" fluid>
                    <Navbar/>
                    <BreadCrumb/>
                    <KanbanBoard/>
                    {/*<Row className="mt-4" xs={3}>*/}
                    {/*    /!* mapping through enum keys so app could contain as many boards as possible *!/*/}
                    {/*        {(Object.keys(IssuesCategories) as Array<keyof typeof IssuesCategories>).map(category =>*/}
                    {/*            <Board category={category} key={category}/>*/}
                    {/*        )}*/}
                    {/*</Row>*/}
                </Container>
            </div>
    );
}

export default App;
