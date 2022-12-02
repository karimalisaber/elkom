import { Teacher } from './model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { initialStatus, Status } from '../../status.interface';
import * as actions from './actions';
export const featureKey = 'teachers';

interface TeacherState extends Teacher{
    loaded?: boolean
}

export interface State extends EntityState<TeacherState>, Status {
    // additional entities state properties
}

export const adapter: EntityAdapter<TeacherState> = createEntityAdapter<TeacherState>();

export const initialState: State = adapter.getInitialState({
    // additional entity state properties
    ...initialStatus
});

export const reducer = createReducer(
    initialState,
    on(actions.loadTeachers,
        (state) => ({ ...state, loading: true })),

    on(actions.loadTeachersSuccess,
        (state, action) => adapter.setAll(action.response.data, { ...state, loading: false, loaded: true })
    ),
    on(actions.loadTeachersFailure, (state, { error }) => ({ ...state, error, loading: false, loaded: false })),


    on(actions.loadTeacher,
        (state) => ({ ...state, loading: true })),

    on(actions.loadTeacherSuccess,
        (state, action) => adapter.upsertOne({...action.response.data, loaded: true}, { ...state, loading: false, loaded: true })
    ),
    on(actions.loadTeacherFailure, (state, { error }) => ({ ...state, error, loading: false, loaded: false })),

);


export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();


export const selectById = (id: string) => (state: State) => state.entities[id];