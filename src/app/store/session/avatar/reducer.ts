import { Teacher } from './model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store';
import { Status } from '../../status.interface';
import * as actions from './actions';

export interface State extends Status {
    // additional entities state properties
    avatar: any
}


export const featureKey = 'avatar';




export const reducer = createReducer(
    null,
    on(actions.loadAvatar, (state, {  }) => {
        
        return { ...state, loading: false, loaded: true }
    }),
    on(actions.loadAvatarSuccess, (state, { response }) => {
        
        return { ...state, avatar: response, loading: false, loaded: true }
    }),
    
);

export const  selectAvatar  = createFeatureSelector(featureKey)