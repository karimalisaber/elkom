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
export const featureKey = 'lookups';

export interface State {
    [fromSpecialties.featureKey]: fromSpecialties.State;
}

export const reducers: ActionReducerMap<State> = {
    [fromSpecialties.featureKey]: fromSpecialties.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

const selectFeature = createFeatureSelector<State>(featureKey);

const selectSpecialtiesFeature = createSelector(selectFeature, (state) => state[fromSpecialties.featureKey]);


export const effects =[
    SpecialtiesEffects
]


export function SelectLookup(){
    return {
        specialties :{
            all: createSelector(selectSpecialtiesFeature, fromSpecialties.selectAll),
            status: createSelector(selectSpecialtiesFeature, (state) => selectStatus(state))
        }
    }
}