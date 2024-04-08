import React, {useEffect} from 'react';
import "./App.scss"
import "bootstrap/dist/css/bootstrap.min.css"
import GitAPI from "./services/GitAPI";
import {Container, Row, Col, Form, Button, Breadcrumb} from "react-bootstrap";
import {StarFill} from "react-bootstrap-icons"

function App() {
    /* temporarily data */
    const repoOwner = "facebook"
    const repoName = "react"
    const starsCount = 194000

    useEffect(() => {
        GitAPI.getRepoIssues("https://github.com/facebook/react")
    }, [])

    return (
        <div className="App">
            <Container className="mt-3" fluid>
                <Row>
                    <Col xs={10}>
                        <Form.Control
                            type="text"
                            placeholder="Enter repo URL"
                        />
                    </Col>
                    <Col xs={2}>
                        <Button>Load issues</Button>
                    </Col>
                </Row>

                <Row xs="auto">
                    <Col >
                        <Breadcrumb className="m-3">
                            <Breadcrumb.Item href={`https://github.com/${repoOwner}`}>{repoOwner}</Breadcrumb.Item>
                            <Breadcrumb.Item href={`https://github.com/${repoOwner}/${repoName}`}>
                                {repoName}
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col>
                        <StarFill color="#E67700"/>
                        <p>{starsCount} stars</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
