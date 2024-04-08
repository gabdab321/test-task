import React from 'react';
import "./App.scss"
import "bootstrap/dist/css/bootstrap.min.css"
import {Container, Row, Col, Breadcrumb} from "react-bootstrap";
import {StarFill} from "react-bootstrap-icons"
import Navbar from "./components/Navbar/Navbar";
import {useAppSelector} from "./hooks/reduxHooks";
import Board from "./components/Board/Board";
import BreadCrumb from "./components/BreadCrumb/BreadCrumb";

function App() {
    const {issues} = useAppSelector(state => state.repo)

    return (
        <div className="App">
            <Container className="mt-3" fluid>
                <Navbar/>
                <BreadCrumb/>
                <Row className="mt-4" xs={3}>
                    <Board issues={issues.filter(issue => issue.state === "open")} title="ToDo"/>
                    <Board issues={issues.filter(issue => issue.state === "closed")} title="In Progress"/>
                    <Board issues={issues.filter(issue => issue.state === "closed")} title="Done"/>
                </Row>
            </Container>
        </div>
    );
}

export default App;
