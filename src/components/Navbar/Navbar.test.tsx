import React from 'react'
import { fireEvent, waitFor } from '@testing-library/react'
import axios from 'axios'
import Navbar from './Navbar'
import {renderWithProviders} from "../../utils/test-utils";
import {setupStore} from "../../redux/store";

jest.mock('axios')

describe('Navbar component', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders without crashing', () => {
        const store = setupStore()
        renderWithProviders(<Navbar />, {store})
    })

    it('displays error message if invalid URL is entered', async () => {
        const store = setupStore()
        const { getByPlaceholderText, getByText, queryByText } = renderWithProviders(<Navbar />, {store})
        const input = getByPlaceholderText('Enter repo URL')
        const button = getByText('Load issues')

        fireEvent.change(input, { target: { value: 'invalid-url' } })
        fireEvent.click(button)

        await waitFor(() => {
            expect(queryByText('Please enter github URL')).toBeInTheDocument()
        })
    })

    it('fetches and displays repo issues on valid URL and successful request', async () => {
        const store = setupStore()
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

        const { getByPlaceholderText, getByText } = renderWithProviders(<Navbar />, {store})
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
        const store = setupStore()
        const mockedGetRepo = jest.spyOn(axios, 'get')
        mockedGetRepo.mockRejectedValueOnce(new Error('Request failed'))

        const { getByPlaceholderText, getByText, queryByText } = renderWithProviders(<Navbar />, {store})
        const input = getByPlaceholderText('Enter repo URL')
        const button = getByText('Load issues')

        fireEvent.change(input, { target: { value: 'https://github.com/facebook/react51235' } })
        fireEvent.click(button)

        await waitFor(() => {
            expect(queryByText('Something went wrong. Please check if you entered correct URL')).toBeInTheDocument()
        })
    })
})
