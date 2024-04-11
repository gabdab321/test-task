import React from 'react';
import "./App.scss"
import "bootstrap/dist/css/bootstrap.min.css"
import {Container} from "react-bootstrap";
import Navbar from "./components/Navbar/Navbar";
import BreadCrumb from "./components/BreadCrumb/BreadCrumb";
import KanbanBoard from "./components/KanbanBoard/KanbanBoard";

function App() {
    return (
            <div className="App">
                <Container className="mt-3" fluid>
                    <Navbar/>
                    <BreadCrumb/>
                    <KanbanBoard/>
                </Container>
            </div>
    );
}

export default App;
