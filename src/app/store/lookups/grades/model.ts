export interface Grade {
    id: string;
    title: string;
    description: string;
    program: {
        id: string;
        title: string;
        description: string;
    }
}