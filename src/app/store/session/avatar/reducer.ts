import { Teacher } from './model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on, createSelector } from '@ngrx/store';
import { Status } from '../../status.interface';

export interface State extends Status {
    // additional entities state properties
}


export const featureKey = 'avatar';




export const reducer = createReducer(
    null,
    
);


// export const  selectAvatar  = createSelector()