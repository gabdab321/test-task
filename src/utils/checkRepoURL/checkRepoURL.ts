/* checks for issues in input query before generating a request, returns blank string if all is good */

export function checkRepoURL(url: string): string {
    if(url.length == 0 ) {
        return "Please enter URL"
    }

    if(!url.includes("https://github.com")){
        return "Please enter github URL"
    }

    return ""
}