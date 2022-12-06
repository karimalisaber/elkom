import * as fromAvatar from './avatar/reducer';
import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
} from '@ngrx/store';

import { environment } from 'src/environments/environment';
import { selectStatus } from '../status.interface';
import { UserAvatarEffect } from './avatar/effects';

export const featureKey = 'session';

export interface State {
    [fromAvatar.featureKey]: fromAvatar.State;
}

export const reducers: ActionReducerMap<State> = {
    [fromAvatar.featureKey]: fromAvatar.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

const selectFeature = createFeatureSelector<State>(featureKey);

const selectAvatarFeature = createSelector(selectFeature, (state) => state[fromAvatar.featureKey]);



export const UserEffects =[
    UserAvatarEffect
]


export function selectUserDetails(){
    return {
        avatar :{
            item: selectAvatarFeature,
            status: createSelector(selectAvatarFeature, (state) => selectStatus(state))
        },
       
    }
}