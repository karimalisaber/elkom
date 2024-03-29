import { Specialty } from './../lookups/specialities/model';
import { CustomResponse } from './../store.interface';
import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Session, User } from './session.model';



export const login = createAction(
    '[Root/Session] login',
    props<{user: User}>()
);

export const loginSuccess = createAction(
    '[Root/Session] login Success',
    props<{ data: CustomResponse<User>}>()
);

export const loginFailure = createAction(
    '[Root/Session] login Failure',
    props<{ error: any }>()
);


export const getUser = createAction(
    '[Root/Session] getUser'
);

export const getUserSuccess = createAction(
    '[Root/Session] getUser Success',
    props<{ data: CustomResponse<User>}>()
);

export const getUserFailure = createAction(
    '[Root/Session] getUser Failure',
    props<{ error: any }>()
);



export const teacherSignup = createAction(
    '[Root/Session] teacher signup',
    props<{user: User}>()
);

export const teacherSignupSuccess = createAction(
    '[Root/Session] teacher signup Success',
    props<{ user: User }>()
);

export const teacherSignupFailure = createAction(
    '[Root/Session] teacher signup Failure',
    props<{ error: any }>()
);



export const studentSignup = createAction(
    '[Root/Session] student signup',
    props<{user: User}>()
);

export const studentSignupSuccess = createAction(
    '[Root/Session] student signup Success',
    props<{ user: User }>()
);

export const studentSignupFailure = createAction(
    '[Root/Session] teacher signup Failure',
    props<{ error: any }>()
);


export const logout = createAction(
    '[Root/Session] logout Session'
);


export const logoutSuccess = createAction(
    '[Root/Session] logout Success Session'
);

export const updateEmail = createAction(
    '[Root/Session] updateEmail',
    props<{identity: string}>()

);

export const updateEmailSuccess = createAction(
    '[Root/Session] updateEmail Success',
    props<{email: string}>()

);

export const updateEmailFailure = createAction(
    '[Root/Session] updateEmail Failure',
    props<{ error: any }>()
);




export const updateUserName = createAction(
    '[Root/Session] updateUserName',
    props<{identity: string}>()
);

export const updateUserNameSuccess = createAction(
    '[Root/Session] updateUserName Success',
    props<{ userName: string}>()
);

export const updateUserNameFailure = createAction(
    '[Root/Session] updateUserName Failure',
    props<{ error: any }>()
);




export const updateMobile = createAction(
    '[Root/Session] updateMobile',
    props<{identity: string}>()

);

export const updateMobileSuccess = createAction(
    '[Root/Session] updateMobile Success',
    props<{ mobileNumber: {number: string} }>()
);

export const updateMobileFailure = createAction(
    '[Root/Session] updateMobile Failure',
    props<{ error: any }>()
);




export const updateMainInfo = createAction(
    '[Root/Session] updateMainInfo',
    props<{user: User}>()
);

export const updateMainInfoSuccess = createAction(
    '[Root/Session] updateMainInfo Success',
    props<{ user: User }>()
);

export const updateMainInfoFailure = createAction(
    '[Root/Session] updateMainInfo Failure',
    props<{ error: any }>()
);



export const addCertificate = createAction(
    '[Root/Session] addCertificate',
    props<{ file: FormData, SpecialtyId: string, Title: string, Description: string }>()

);

export const addCertificateSuccess = createAction(
    '[Root/Session] addCertificate Success',
    props<{ response: CustomResponse<any> }>()
);

export const addCertificateFailure = createAction(
    '[Root/Session] addCertificate Failure',
    props<{ error: any }>()
);






export const addSpecialty = createAction(
    '[Root/Session] addSpecialty',
    props<{ specialtyId: string }>()

);

export const addSpecialtySuccess = createAction(
    '[Root/Session] addSpecialty Success',
    props<{ response: CustomResponse<Specialty> }>()
);

export const addSpecialtyFailure = createAction(
    '[Root/Session] addSpecialty Failure',
    props<{ error: any }>()
);


export const removeSpecialty = createAction(
    '[Root/Session] removeSpecialty',
    props<{ file: FormData }>()
);

export const removeSpecialtySuccess = createAction(
    '[Root/Session] removeSpecialty Success',
    props<{ response: CustomResponse<string> }>()
);

export const removeSpecialtyFailure = createAction(
    '[Root/Session] removeSpecialty Failure',
    props<{ error: any }>()
);



export const updatePersonalInformation = createAction(
    '[Root/Session] updatePersonalInformation',
    props<{ fullName: string, birthDate : Date, gender: 1 | 2 }>()
);

export const updatePersonalInformationSuccess = createAction(
    '[Root/Session] updatePersonalInformation Success',
    props<{ fullName: string, birthDate : Date, gender: 1 | 2 }>()
);

export const updatePersonalInformationFailure = createAction(
    '[Root/Session] updatePersonalInformation Failure',
    props<{ error: any }>()
);







