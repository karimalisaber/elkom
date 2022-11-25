import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector
} from '@ngrx/store';

import * as Session from './session/session.reducer'

export interface State {
    [Session.featureKey]: Session.State;
}

export const reducers: ActionReducerMap<State> = {
    [Session.featureKey]: Session.reducer,
};


// Session
const selectSessionFeature = createFeatureSelector<Session.State>(Session.featureKey);
export const selectSession = createSelector(selectSessionFeature, Session.getSession);
