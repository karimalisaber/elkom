import { Specialty } from './model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { initialStatus, Status } from '../../status.interface';
import * as actions from './actions';
export const featureKey = 'specialties';

export interface State extends EntityState<Specialty>, Status {
    // additional entities state properties
}

export const adapter: EntityAdapter<Specialty> = createEntityAdapter<Specialty>();

export const initialState: State = adapter.getInitialState({
    // additional entity state properties
    ...initialStatus
});

export const reducer = createReducer(
    initialState,
    on(actions.loadSpecialties,
        (state) => ({ ...state, loading: true })),

    on(actions.loadSpecialtiesSuccess,
        (state, action) => adapter.setAll(action.response.data, { ...state, loading: false, loaded: true })
    ),
    on(actions.loadSpecialtiesFailure, (state, { error }) => ({ ...state, error, loading: false, loaded: false })),

);


export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();
