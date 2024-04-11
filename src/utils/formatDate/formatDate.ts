export function formatDate(dateString: string): string {
    const currentDate = new Date()
    const date = new Date(dateString)
    const timeDifference = currentDate.getTime() - date.getTime();
    const secondsDifference = Math.floor(timeDifference / 1000)
    const minutesDifference = Math.floor(secondsDifference / 60)
    const hoursDifference = Math.floor(minutesDifference / 60)
    const daysDifference = Math.floor(hoursDifference / 24)
    const weeksDifference = Math.floor(daysDifference / 7)
    const monthsDifference = Math.floor(daysDifference / 30)

    if (monthsDifference >= 1) {
        return `created ${monthsDifference} month${monthsDifference > 1 ? 's' : ''} ago`
    } else if (weeksDifference >= 2) {
        return `created ${weeksDifference} weeks ago`
    } else if (weeksDifference === 1) {
        return `created a week ago`
    } else if (daysDifference >= 7) {
        return `created ${daysDifference} days ago`
    } else if (daysDifference >= 2) {
        return `created ${daysDifference} days ago`
    } else if (daysDifference === 1) {
        return `created a day ago`
    } else if (hoursDifference >= 1) {
        return `created ${hoursDifference} hours ago`
    } else if (minutesDifference >= 1) {
        return `created ${minutesDifference} minutes ago`
    } else {
        return `created just now`
    }
}