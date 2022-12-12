import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomResponse } from '../../store.interface';
import * as actions from './actions';
const BaseUrl = environment.baserUrl

@Injectable()
export class UserAvatarEffect {

    loadAvatar$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.loadAvatar),
            // take(1),
            mergeMap(({ url}) => this.loadAvatar(url)
                .pipe(
                    tap(res=> console.log(res, 'karim')),
                    map((response: any) => actions.loadAvatarSuccess({ response })),
                    catchError((error) => of(actions.loadAvatarFailure({ error })))
                ),
            )
        )
    );

    loadAvatar(url: string): Observable<any> {
        return this.http.get(url, {responseType: 'blob' , observe: 'response'})
    }


    
    updateAvatar$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.updateAvatar),
            // take(1),
            mergeMap(({file }) => this.updateAvatar(file)
                .pipe(
                    map((response: any) => actions.updateAvatarSuccess({ response })),
                    catchError((error) => of(actions.updateAvatarFailure({ error })))
                ),
            )
        )
    );

    updateAvatar(file): Observable<CustomResponse<any>> {
        const url = BaseUrl + '/users/profile/update/avatar'
        return this.http.put<CustomResponse<any>>(url, file)
    }

    constructor(
        private http: HttpClient,
        private actions$: Actions
    ) { }
}
