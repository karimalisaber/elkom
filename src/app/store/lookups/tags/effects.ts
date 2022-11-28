import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, distinct, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomResponse } from '../../store.interface';
import * as actions from './actions'
import { Tag } from './model';

const BaseUrl = environment.baserUrl

@Injectable()
export class TagsEffect {
    
    load$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.loadTags),
            // take(1),
            mergeMap(({ }) => this.load()
                .pipe(
                    map((response: any) => actions.loadTagsSuccess({ response })),
                    catchError((error) => of(actions.loadTagsFailure({ error })))
                ),
            )
        )
    );

    load(): Observable<CustomResponse<Tag[]>>{
        const url = BaseUrl + '/tags/list'
        return this.http.get<CustomResponse<Tag[]>>(url)
    }
    
    constructor(
        private http: HttpClient,
        private actions$: Actions
    ) { }
}
