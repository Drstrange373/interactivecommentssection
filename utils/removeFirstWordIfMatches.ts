
export default function removeFirstWordIfMatches(content:string, word:string):string{
    const firstWord = content.substring(0, word.length)
    if(firstWord !== word || !word) return content
    return content.substring(word.length + 1)
}

// Example use case

// const content = "@username, is a sample name"
// const word = "@username,"
// console.log(removeFirstWordIfMatches(content, word)) // Output: "is a sample name"