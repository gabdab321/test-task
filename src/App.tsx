import React, {useState} from 'react';
import "./App.scss"
import "bootstrap/dist/css/bootstrap.min.css"
import {Container, Row} from "react-bootstrap";
import Navbar from "./components/Navbar/Navbar";
import {useAppSelector} from "./hooks/reduxHooks";
import Board from "./components/Board/Board";
import BreadCrumb from "./components/BreadCrumb/BreadCrumb";
import {IssuesCategories} from "./redux/slices/userIssuesSlice";

function App() {
    const {issues} = useAppSelector(state => state.repo)
    const userIssues = useAppSelector(state => state.userIssues)

    const [currentBoard, setCurrentBoard] = useState<any>(null)
    const [currentIssue, setCurrentIssue] = useState<any>(null)

    console.log(userIssues)

    return (
        <div className="App">
            <Container className="mt-3" fluid>
                <Navbar/>
                <BreadCrumb/>
                <Row className="mt-4" xs={3}>
                    {/* mapping through enum keys so app could contain as many boards as possible */}
                    {(Object.keys(IssuesCategories) as Array<keyof typeof IssuesCategories>).map(category =>
                        <Board category={category} key={category}/>
                    )}
                </Row>
            </Container>
        </div>
    );
}

export default App;
