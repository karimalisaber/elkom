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
    tags: string[],
    hasAttachments?: boolean,

    answers: Answer[]
    

}

export interface Answer {
    id: string,
    text: string,
    created: string,
    answerdBy: string,
    answerdById: string
}