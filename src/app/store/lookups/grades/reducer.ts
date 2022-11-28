import { Grade } from './model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { initialStatus, Status } from '../../status.interface';
import * as actions from './actions';
export const featureKey = 'grades';

export interface State extends EntityState<Grade>, Status {
    // additional entities state properties
}

export const adapter: EntityAdapter<Grade> = createEntityAdapter<Grade>();

export const initialState: State = adapter.getInitialState({
    // additional entity state properties
    ...initialStatus
});

export const reducer = createReducer(
    initialState,
    on(actions.loadGrades,
        (state) => ({ ...state, loading: true })),

    on(actions.loadGradesSuccess,
        (state, action) => adapter.setAll(action.response.data, { ...state, loading: false, loaded: true })
    ),
    on(actions.loadGradesFailure, (state, { error }) => ({ ...state, error, loading: false, loaded: false })),

);


export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();
