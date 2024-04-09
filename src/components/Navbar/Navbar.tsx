import React, {useState} from 'react';
import {Alert, Button, Col, Form, Row} from "react-bootstrap";
import GitAPI from "../../services/GitAPI";
import {useAppDispatch} from "../../hooks/reduxHooks";
import {checkRepoURL} from "../../utils/checkRepoURL/checkRepoURL";
import {setRepo, setRepoIssues} from "../../redux/slices/repoSlice";
import {IssuesCategories, setIssues} from "../../redux/slices/userIssuesSlice";

const Navbar = () => {
    const dispatch = useAppDispatch()
    const [repoURL, setRepoUrl] = useState<string>("https://github.com/facebook/react")
    const [error, setError] = useState<string>("")

    async function handleClick() {
        /* checking input value for a problems before sending a request */
        const inputCheck = checkRepoURL(repoURL)
        if(inputCheck !== "") {
            setError(inputCheck)
            return
        }

        /* fetching data */
        const repo = await GitAPI.getRepo(repoURL)
        const repoIssues = await GitAPI.getRepoIssues(repoURL)

        /* checking if request had some problems */
        if(!repo || !repoIssues) {
            setError("Something went wrong. Please check if you entered correct URL")
            return
        }

        /* remove error message on success */
        setError("")

        /* after all checks dispatching to the redux store */
        dispatch(setRepo(repo))
        dispatch(setRepoIssues(repoIssues))

        /* request to github api returns only opened issues, so I can store it all in "todo" category */
        dispatch(setIssues({category: IssuesCategories.TODO, issues: repoIssues}))
    }

    return (
        <>
            <Row>
                <Col xs={10}>
                    <Form.Control
                        value={repoURL}
                        onChange={e => setRepoUrl(e.target.value)}
                        type="text"
                        placeholder="Enter repo URL"
                    />
                </Col>
                <Col xs={2}>
                    <Button onClick={handleClick}>Load issues</Button>
                </Col>
            </Row>
            {error && <Alert className="mt-2" variant="danger">{error}</Alert>}
        </>
    );
};

export default Navbar;