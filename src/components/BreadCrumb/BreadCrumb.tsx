import React from 'react';
import {Breadcrumb, Col, Row} from "react-bootstrap";
import {StarFill} from "react-bootstrap-icons";
import {useAppSelector} from "../../hooks/reduxHooks";
import {formatStarsCount} from "../../utils/formatStarsCount/formatStarsCount";

const BreadCrumb = () => {
    const {repo} = useAppSelector(state => state.repo)

    return (
        <Row xs="auto">
            <Col >
                <Breadcrumb className="m-3">
                    <Breadcrumb.Item href={`https://github.com/${repo.owner.login}`}>{repo.owner.login}</Breadcrumb.Item>
                    <Breadcrumb.Item href={`https://github.com/${repo.owner.login}/${repo.name}`}>
                        {repo.name}
                    </Breadcrumb.Item>
                </Breadcrumb>
            </Col>
            <Col className="align-content-center text-center">
                <Row xs="auto">
                    <Col>
                        <StarFill width="22px" height="22px" color="#E67700"/>
                    </Col>
                    <Col className="p-0 fw-bold">
                        {formatStarsCount(repo.stargazers_count)} stars
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default BreadCrumb;