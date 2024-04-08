import {checkRepoURL} from "./checkRepoURL"

describe("checkRepoURL", () => {
    test('returns "Please enter URL" when URL is empty', () => {
        const url = ''
        const errorMessage = checkRepoURL(url)
        expect(errorMessage).toBe('Please enter URL')
    })

    test('returns "Please enter github URL" when URL does not include "https://github.com"', () => {
        const url = 'https://gitlab.com/myrepo'
        const errorMessage = checkRepoURL(url)
        expect(errorMessage).toBe('Please enter github URL')
    })

    test('checkRepoURL returns empty string when URL is valid', () => {
        const url = 'https://github.com/myusername/myrepo'
        const errorMessage = checkRepoURL(url)
        expect(errorMessage).toBe('')
    })
})