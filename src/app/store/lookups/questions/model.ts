export interface Question {
    id: string,
    text: string,
    created: string,
    askedBy: string,
    askedById: string,
    answersCount: number,
    upVotesCount: number,
    downVotesCount: number,
    description: string,
    tags: string[]
}