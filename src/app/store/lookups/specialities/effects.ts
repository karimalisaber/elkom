import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, distinct, Observable, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomResponse } from '../../store.interface';
import * as actions from './actions'
import { Specialty } from './model';

const BaseUrl = environment.baserUrl

@Injectable()
export class SpecialtiesEffects {
    
    load$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.loadSpecialties),
            // take(1),
            mergeMap(({ }) => this.load()
                .pipe(
                    map((response: any) => actions.loadSpecialtiesSuccess({ response })),
                    catchError((error) => of(actions.loadSpecialtiesFailure({ error })))
                ),
            )
        )
    );

    load(): Observable<CustomResponse<Specialty[]>>{
        const url = BaseUrl + '/lookups/specialties/list'
        return this.http.get<CustomResponse<Specialty[]>>(url)
    }
    
    constructor(
        private http: HttpClient,
        private actions$: Actions
    ) { }
}
