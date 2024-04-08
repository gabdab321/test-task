/* formats long numbers(above 1000), so they get suffix "K" */
export function formatStarsCount(stars: number): string {
    /* doesn't need formatting if under 1000 */
    if(stars < 1000) {
        return stars.toString()
    }

    const numString = stars.toString()
    if (numString.length <= 3) {
        return numString
    }
    const truncatedNum = numString.slice(0, -3)
    const decimalPart = numString.slice(-3, -2)
    const decimalPartStr = decimalPart !== '0' ? ',' + decimalPart : ''
    return truncatedNum + decimalPartStr + " K"
}