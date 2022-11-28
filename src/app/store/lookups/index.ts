import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
} from '@ngrx/store';

import { environment } from 'src/environments/environment';
import { selectStatus } from '../status.interface';
import { SpecialtiesEffects } from './specialities/effects';
import * as fromSpecialties from './specialities/reducer';
import * as fromGrades from './grades/reducer';
import { GradesEffect } from './grades/effects';
export const featureKey = 'lookups';

export interface State {
    [fromSpecialties.featureKey]: fromSpecialties.State;
    [fromGrades.featureKey]: fromGrades.State;
}

export const reducers: ActionReducerMap<State> = {
    [fromSpecialties.featureKey]: fromSpecialties.reducer,
    [fromGrades.featureKey]: fromGrades.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

const selectFeature = createFeatureSelector<State>(featureKey);

const selectSpecialtiesFeature = createSelector(selectFeature, (state) => state[fromSpecialties.featureKey]);
const selectGradesFeature = createSelector(selectFeature, (state) => state[fromGrades.featureKey]);


export const effects =[
    SpecialtiesEffects,
    GradesEffect
]


export function SelectLookup(){
    return {
        specialties :{
            all: createSelector(selectSpecialtiesFeature, fromSpecialties.selectAll),
            status: createSelector(selectSpecialtiesFeature, (state) => selectStatus(state))
        },
        grades :{
            all: createSelector(selectGradesFeature, fromSpecialties.selectAll),
            status: createSelector(selectGradesFeature, (state) => selectStatus(state))
        }
    }
}