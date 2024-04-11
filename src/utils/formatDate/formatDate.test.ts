import {formatDate} from "./formatDate";
import {advanceTo, clear} from "jest-date-mock";

describe('formatDate function', () => {
    beforeEach(() => {
        advanceTo(new Date('2024-04-11T12:00:00Z'))
    })

    afterEach(() => {
        clear()
    })

    test('should format date strings correctly', () => {
        expect(formatDate("2024-04-10T12:00:00Z")).toEqual("created a day ago")
        expect(formatDate("2024-04-09T12:00:00Z")).toEqual("created 2 days ago")
        expect(formatDate("2024-04-05T12:00:00Z")).toEqual("created 6 days ago")
        expect(formatDate("2024-04-04T12:00:00Z")).toEqual("created a week ago")
        expect(formatDate("2024-04-03T12:00:00Z")).toEqual("created a week ago")
        expect(formatDate("2024-03-27T12:00:00Z")).toEqual("created 2 weeks ago")
        expect(formatDate("2024-03-09T12:00:00Z")).toEqual("created 1 month ago")
        expect(formatDate("2024-02-09T12:00:00Z")).toEqual("created 2 months ago")

        expect(formatDate("2024-04-11T12:00:00Z")).toEqual("created just now")
    })
})