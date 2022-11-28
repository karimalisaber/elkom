import { TagsEffect } from './tags/effects';
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
import * as fromTags from './tags/reducer';
import { GradesEffect } from './grades/effects';
export const featureKey = 'lookups';

export interface State {
    [fromSpecialties.featureKey]: fromSpecialties.State;
    [fromGrades.featureKey]: fromGrades.State;
    [fromTags.featureKey]: fromTags.State;
}

export const reducers: ActionReducerMap<State> = {
    [fromSpecialties.featureKey]: fromSpecialties.reducer,
    [fromGrades.featureKey]: fromGrades.reducer,
    [fromTags.featureKey]: fromTags.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

const selectFeature = createFeatureSelector<State>(featureKey);

const selectSpecialtiesFeature = createSelector(selectFeature, (state) => state[fromSpecialties.featureKey]);
const selectGradesFeature = createSelector(selectFeature, (state) => state[fromGrades.featureKey]);
const selectTagsFeature = createSelector(selectFeature, (state) => state[fromTags.featureKey]);


export const effects =[
    SpecialtiesEffects,
    GradesEffect,
    TagsEffect
]


export function SelectLookup(){
    return {
        specialties :{
            all: createSelector(selectSpecialtiesFeature, fromSpecialties.selectAll),
            status: createSelector(selectSpecialtiesFeature, (state) => selectStatus(state))
        },
        grades :{
            all: createSelector(selectGradesFeature, fromGrades.selectAll),
            status: createSelector(selectGradesFeature, (state) => selectStatus(state))
        },
        tags :{
            all: createSelector(selectTagsFeature, fromTags.selectAll),
            status: createSelector(selectTagsFeature, (state) => selectStatus(state))
        }
    }
}