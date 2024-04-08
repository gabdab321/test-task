import {formatStarsCount} from "./formatStarsCount";

describe("formatStarsCount", () => {
    test("should return stars count as it is, if count is under 1000", () => {
        expect(formatStarsCount(200)).toBe("200")
        expect(formatStarsCount(0)).toBe("0")
        expect(formatStarsCount(999)).toBe("999")
    })

    test("should return stars count with K", () => {
        expect(formatStarsCount(211521)).toBe("211,5 K")
        expect(formatStarsCount(12300)).toBe("12,3 K")
        expect(formatStarsCount(1200)).toBe("1,2 K")
    })

    test("should return stars count with K without decimal", () => {
        expect(formatStarsCount(211000)).toBe("211 K")
        expect(formatStarsCount(12000)).toBe("12 K")
        expect(formatStarsCount(1000)).toBe("1 K")
    })
})