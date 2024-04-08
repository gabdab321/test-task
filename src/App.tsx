import React, {useEffect, useState} from 'react';
import "./App.scss"
import "bootstrap/dist/css/bootstrap.min.css"
import GitAPI from "./services/GitAPI";
import {Container, Row, Col, Form, Button, Breadcrumb} from "react-bootstrap";
import {StarFill} from "react-bootstrap-icons"
import Navbar from "./components/Navbar/Navbar";
import {useAppSelector} from "./hooks/reduxHooks";

function App() {
    const {repo, issues} = useAppSelector(state => state.repo)

    return (
        <div className="App">
            <Container className="mt-3" fluid>
                <Navbar/>
                <Row xs="auto">
                    <Col >
                        <Breadcrumb className="m-3">
                            <Breadcrumb.Item href={`https://github.com/${repo.owner.login}`}>{repo.owner.login}</Breadcrumb.Item>
                            <Breadcrumb.Item href={`https://github.com/${repo.owner.login}/${repo.name}}`}>
                                {repo.name}
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col className="align-content-center">
                        <div className="m-0"><StarFill width="26px" height="26px" color="#E67700"/> {"starsCount"} stars</div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
