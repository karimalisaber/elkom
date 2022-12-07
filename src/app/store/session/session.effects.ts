import { AuthService } from './../../services/auth.service';
import { CustomResponse } from './../store.interface';
import { User, Session } from './session.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of, switchMap, tap } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import * as actions from './session.actions';

const BaseUrl = environment.baserUrl

@Injectable()
export class SessionEffects {

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.login),
            mergeMap(({ user }) => this.login(user)
                .pipe(
                    map(
                        data => actions.loginSuccess({ data })),
                    catchError((error) => of(actions.loginFailure({ error })))
                ),
            )
        )
    );


    getUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.getUser),
            mergeMap(() => this.getUser()
                .pipe(
                    map(
                        data => actions.getUserSuccess({ data })),
                    catchError((error) => of(actions.getUserFailure({ error })))
                ),
            )
        )
    );


    teacherSignup$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.teacherSignup),
            mergeMap(({ user }) => this.addTeacher(user)
                .pipe(
                    map(
                        (res: any) => actions.teacherSignupSuccess({ user: res.data })),
                    catchError((error) => of(actions.teacherSignupFailure({ error })))
                ),
            )
        )
    );


    studentSignup$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.studentSignup),
            mergeMap(({ user }) => this.addStudent(user)
                .pipe(
                    map(
                        (res: any) => actions.studentSignupSuccess({ user: res.data })),
                    catchError((error) => of(actions.studentSignupFailure({ error })))
                ),
            )
        )
    );


    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.logout),
            mergeMap(() => this.logout()
                .pipe(
                    map(() => actions.logoutSuccess()),
                ),
            )
        )
    );

    logout() {
        this.auth.logOut()

        return of(true)
    }


    addCertificate$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.addCertificate),
            mergeMap(({ file, SpecialtyId, Title, Description }) => this.addCertificate(file, SpecialtyId, Title, Description)
                .pipe(
                    map(
                        (res: any) => actions.addCertificateSuccess({ response: res.data })),
                    catchError((error) => of(actions.addCertificateFailure({ error })))
                ),
            )
        )
    );
    addCertificate(file, SpecialtyId, Title, Description) {
        const url = BaseUrl + `/users/teachers/achievements/add?SpecialtyId=${SpecialtyId}&&Title=${Title}&&Description=${Description}`
        return this.http.put<CustomResponse<any>>(url, file)

    }


    addSpecialty$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.addSpecialty),
            mergeMap(({ specialtyId }) => this.addSpecialty(specialtyId)
                .pipe(
                    map(
                        (res: any) => actions.addSpecialtySuccess({ response: res.data })),
                    catchError((error) => of(actions.addSpecialtyFailure({ error })))
                ),
            )
        )
    );

    addSpecialty(specialtyId: string) {
        const url = BaseUrl + `/users/teachers/specialty/add?SpecialtyId=${specialtyId}`
        return this.http.put<CustomResponse<string>>(url, {})
    }



    

    





    addTeacher(user: User) {
        const url = BaseUrl + '/users/signup/teacher'

        return this.http.post(url, user).pipe(
            switchMap((res: any) => {
                if (res.succeeded) {
                    this.auth.setToken(res.data.authorityToken)

                    return this.login(user)
                } else {
                    throw (res)
                }
            })
        )
    }



    addStudent(user: User) {
        const url = BaseUrl + '/users/signup/student'

        return this.http.post(url, user).pipe(
            switchMap((res: any) => {
                if (res.succeeded) {
                    this.auth.setToken(res.data.authorityToken)

                    return this.login(user)
                } else {
                    throw (res)
                }
            })
        )
    }

    login(user: any): Observable<CustomResponse<User>> {
        const url = BaseUrl + '/authentications/SignIn'
        return this.http.post<CustomResponse<Session>>(url, user).pipe(

            switchMap((res: any) => {
                if (res.succeeded) {
                    this.auth.setToken(res.data.token)
                    this.auth.setRefreshToken(res.data.refreshToken)

                    return this.getUser()
                } else {
                    throw (res)
                }
            })
        )
    }

    private getUser(): Observable<CustomResponse<User>> {
        const url = BaseUrl + '/users/profile/get'
        return this.http.get<CustomResponse<User>>(url).pipe(tap(res => this.auth.setUser(res.data)))
    }



    updateEmail$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.updateEmail),
            mergeMap(({identity}) => this.updateEmail(identity)
                .pipe(
                    map(
                        (res: any) => actions.updateEmailSuccess({ email: identity })),
                    catchError((error) => of(actions.updateEmailFailure({ error })))
                ),
            )
        )
    );

    updateEmail(identity: string ) {
        const url = BaseUrl + '/users/profile/update/email'

        return this.http.put(url, {identity})
    }


    
    updateUserName$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.updateUserName),
            mergeMap(({identity}) => this.updateUserName(identity)
                .pipe(
                    map(
                        (res: any) => actions.updateUserNameSuccess({ userName: identity })),
                    catchError((error) => of(actions.updateUserNameFailure({ error })))
                ),
            )
        )
    );

    updateUserName(identity: string ) {
        const url = BaseUrl + '/users/profile/update/username'
        return this.http.put(url, {identity})
    }


    
    updatePersonalInformation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.updatePersonalInformation),
            mergeMap(({fullName, birthDate, gender}) => this.updatePersonalInformation(fullName, birthDate, gender)
                .pipe(
                    map(
                        (res: any) => actions.updatePersonalInformationSuccess( {fullName, birthDate, gender})),
                    catchError((error) => of(actions.updatePersonalInformationFailure({ error })))
                ),
            )
        )
    );

    updatePersonalInformation(fullName, birthDate, gender) {
        const url = BaseUrl + '/users/profile/update/personal-information'

        return this.http.put(url, {fullName, birthDate, gender})
    }

    updateMobile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.updateMobile),
            mergeMap(({identity}) => this.updateMobile(identity)
                .pipe(
                    map(
                        (res: any) => actions.updateMobileSuccess({ mobileNumber: {number : identity} })),
                    catchError((error) => of(actions.updateMobileFailure({ error })))
                ),
            )
        )
    );

    updateMobile(identity) {
        const url = BaseUrl + '/users/profile/update/mobile'

        return this.http.put(url, {identity})
    }



    constructor(
        private http: HttpClient,
        private actions$: Actions,
        private auth: AuthService
    ) { }
}
