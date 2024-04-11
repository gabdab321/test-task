import React, {useState} from 'react';
import {Alert, Button, Col, Form, Row} from "react-bootstrap";
import GitAPI from "../../services/GitAPI";
import {useAppDispatch} from "../../hooks/reduxHooks";
import {checkRepoURL} from "../../utils/checkRepoURL/checkRepoURL";
import {setRepo, setIssues, IssuesCategories, localStorageIssues, setUserIssues} from "../../redux/slices/repoSlice";
import {compareIssues} from "../../utils/compareIssues/compareIssues";
import {concatIssues} from "../../utils/concatIssues/concatIssues";

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

        /* remove error message if request successful */
        setError("")

        console.log(repoIssues)

        // init local storage
        if(!localStorage.getItem("userIssues")) localStorage.setItem("userIssues", JSON.stringify([]))

        const oldLocalData = localStorage.getItem("userIssues")
        const oldUserIssues: localStorageIssues[] | null = oldLocalData ? JSON.parse(oldLocalData) : null

        if(oldUserIssues) {
            const currentIssues = oldUserIssues.find(issue => issue.repoId === repo.id)
            // checking if we already have issues of this repo in a localStorage
            if(currentIssues) {
                // compare two arrays, so we know if there are some new issues
                const newIssues = compareIssues(repoIssues, concatIssues(currentIssues.issues))

                // adding new issues to the old issues array
                currentIssues.issues[IssuesCategories.TODO].unshift(...newIssues)

                dispatch(setUserIssues(currentIssues.issues))
                dispatch(setRepo(repo))
                return
            }
        }

        /* after all checks dispatching to the redux store */
        dispatch(setRepo(repo))
        /* set all issues in state to the default */
        dispatch(setUserIssues({
            [IssuesCategories.TODO]: [],
            [IssuesCategories.PROGRESS]: [],
            [IssuesCategories.DONE]: []
        } ))
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