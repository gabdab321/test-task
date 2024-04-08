import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import axios from 'axios'
import Navbar from './Navbar'
import createMockStore from "redux-mock-store"
import { Provider } from "react-redux"

jest.mock('axios')

describe('Navbar component', () => {
    const initialState = {
        repo: {
            private: false,
            id: 0,
            stargazers_count: 0,
            name: "something",
            owner: { login: "enter" }
        },
        issues: []
    }
    const mockStore = createMockStore()
    let store

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders without crashing', () => {
        store = mockStore(initialState)
        render(<Provider store={store}><Navbar /></Provider>)
    })

    it('displays error message if invalid URL is entered', async () => {
        store = mockStore(initialState)
        const { getByPlaceholderText, getByText, queryByText } = render(<Provider store={store}><Navbar /></Provider>)
        const input = getByPlaceholderText('Enter repo URL')
        const button = getByText('Load issues')

        fireEvent.change(input, { target: { value: 'invalid-url' } })
        fireEvent.click(button)

        await waitFor(() => {
            expect(queryByText('Please enter github URL')).toBeInTheDocument()
        })
    })

    it('fetches and displays repo issues on valid URL and successful request', async () => {
        store = mockStore(initialState)
        const mockedGetRepo = jest.spyOn(axios, 'get')
        mockedGetRepo.mockResolvedValueOnce({
            data: {
                name: "abc",
                stargazers_count: 12,
                id: 123,
                private: false,
                owner: {
                    login: "tasd"
                },
            }
        })

        const mockedGetRepoIssues = jest.spyOn(axios, 'get')
        mockedGetRepoIssues.mockResolvedValueOnce({
            data: [
                {
                    title: "abc",
                    comments: 123,
                    created_at: "",
                    number: 123,
                    state: "open",
                    user: {
                        login: "tasd"
                    }
                },
                {
                    title: "qaz",
                    comments: 321,
                    created_at: "",
                    number: 2,
                    state: "closed",
                    user: {
                        login: "tasd"
                    }
                },
            ],
        })

        const { getByPlaceholderText, getByText } = render(<Provider store={store}><Navbar /></Provider>)
        const input = getByPlaceholderText('Enter repo URL')
        const button = getByText('Load issues')

        fireEvent.change(input, { target: { value: 'https://github.com/facebook/react' } })
        fireEvent.click(button)

        await waitFor(() => {
            expect(mockedGetRepo).toHaveBeenCalledWith('https://api.github.com/repos/facebook/react')
            expect(mockedGetRepoIssues).toHaveBeenCalledWith('https://api.github.com/repos/facebook/react/issues')
        })
    })

    it('displays error message if request fails', async () => {
        store = mockStore(initialState)
        const mockedGetRepo = jest.spyOn(axios, 'get')
        mockedGetRepo.mockRejectedValueOnce(new Error('Request failed'))

        const { getByPlaceholderText, getByText, queryByText } = render(<Provider store={store}><Navbar /></Provider>)
        const input = getByPlaceholderText('Enter repo URL')
        const button = getByText('Load issues')

        fireEvent.change(input, { target: { value: 'https://github.com/facebook/react51235' } })
        fireEvent.click(button)

        await waitFor(() => {
            expect(queryByText('Something went wrong. Please check if you entered correct URL')).toBeInTheDocument()
        })
    })
})
