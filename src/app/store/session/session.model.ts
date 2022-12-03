import { Grade } from './../lookups/grades/model';
export interface Session {
    user: User | null,
    authorityToken?: string | null,
    token: string | null,
    refreshToken: string | null
}

export interface User {
    password?: string,
    username?: string,
    fullName?: string,
    email?: string,
    mobileNumber?: {
        number: string
    },
    birthDate?: string,
    gender?: number,
    gradeId?: string
    role: 1 | 2,
    teacherDetails: TeacherDetails
    studentDetails:
    {
        grade: Grade
    }
}

export interface TeacherDetails {
    id: string,
    fullName: string,
    birthDate: string,
    email: string,
    mobileNumber: {
        number: string
    },
    gender: 1 | 2,
    tags: string[],
    specialties: string[],
    attachments: string

}