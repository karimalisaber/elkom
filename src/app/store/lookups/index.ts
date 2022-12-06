import { TeachersEffect } from './teachers/effects';
import { LecturesEffect } from './lectures/effects';
import { ProgramsEffect } from './programs/effects';
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
import * as fromQuestions from './questions/reducer';
import * as fromMyQuestions from './myquestions/reducer';
import * as fromTeachers from './teachers/reducer';
import * as fromSubjects from './subjects/reducer';
import * as fromPrograms from './programs/reducer';
import * as fromLectures from './lectures/reducer';
import { GradesEffect } from './grades/effects';
import { QuestionsEffect } from './questions/effects';
import { SubjectsEffect } from './subjects/effects';
import { MyQuestionsEffect } from './myquestions/effects';
export const featureKey = 'lookups';

export interface State {
    [fromSpecialties.featureKey]: fromSpecialties.State;
    [fromGrades.featureKey]: fromGrades.State;
    [fromTags.featureKey]: fromTags.State;
    [fromQuestions.featureKey]: fromQuestions.State;
    [fromSubjects.featureKey]: fromSubjects.State;
    [fromPrograms.featureKey]: fromPrograms.State;
    [fromLectures.featureKey]: fromLectures.State;
    [fromTeachers.featureKey]: fromTeachers.State;
    [fromMyQuestions.featureKey]: fromMyQuestions.State;
}

export const reducers: ActionReducerMap<State> = {
    [fromSpecialties.featureKey]: fromSpecialties.reducer,
    [fromGrades.featureKey]: fromGrades.reducer,
    [fromTags.featureKey]: fromTags.reducer,
    [fromQuestions.featureKey]: fromQuestions.reducer,
    [fromSubjects.featureKey]: fromSubjects.reducer,
    [fromPrograms.featureKey]: fromPrograms.reducer,
    [fromLectures.featureKey]: fromLectures.reducer,
    [fromTeachers.featureKey]: fromTeachers.reducer,
    [fromMyQuestions.featureKey]: fromMyQuestions.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

const selectFeature = createFeatureSelector<State>(featureKey);

const selectSpecialtiesFeature = createSelector(selectFeature, (state) => state[fromSpecialties.featureKey]);
const selectGradesFeature = createSelector(selectFeature, (state) => state[fromGrades.featureKey]);
const selectTagsFeature = createSelector(selectFeature, (state) => state[fromTags.featureKey]);
const selectQuestionsFeature = createSelector(selectFeature, (state) => state[fromQuestions.featureKey]);
const selectTeachersFeature = createSelector(selectFeature, (state) => state[fromTeachers.featureKey]);
const selectSubjectsFeature = createSelector(selectFeature, (state) => state[fromSubjects.featureKey]);
const selectProgramsFeature = createSelector(selectFeature, (state) => state[fromPrograms.featureKey]);
const selectLecturesFeature = createSelector(selectFeature, (state) => state[fromLectures.featureKey]);
const selectMyQuestionsFeature = createSelector(selectFeature, (state) => state[fromMyQuestions.featureKey]);


export const effects =[
    SpecialtiesEffects,
    GradesEffect,
    TagsEffect,
    QuestionsEffect,
    SubjectsEffect,
    ProgramsEffect,
    LecturesEffect,
    TeachersEffect,
    MyQuestionsEffect
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
        },
        subjects :{
            all: createSelector(selectSubjectsFeature, fromSubjects.selectAll),
            status: createSelector(selectSubjectsFeature, (state) => selectStatus(state))
        },
        
        myQuestions :{
            all: createSelector(selectMyQuestionsFeature, fromMyQuestions.selectAll),
            by_id: (id) => createSelector(selectMyQuestionsFeature, fromMyQuestions.selectById(id)),
            status: createSelector(selectMyQuestionsFeature, (state) => selectStatus(state)),
            loaded: createSelector(selectMyQuestionsFeature, (state) => selectStatus(state).loaded),
        },

        questions :{
            all: createSelector(selectQuestionsFeature, fromQuestions.selectAll),
            by_id: (id) => createSelector(selectQuestionsFeature, fromQuestions.selectById(id)),
            status: createSelector(selectQuestionsFeature, (state) => selectStatus(state)),
            loaded: createSelector(selectQuestionsFeature, (state) => selectStatus(state).loaded),
        },

        teachers :{
            all: createSelector(selectTeachersFeature, fromTeachers.selectAll),
            by_id: (id) => createSelector(selectTeachersFeature, fromTeachers.selectById(id)),

            status: createSelector(selectTeachersFeature, (state) => selectStatus(state)),
            loaded: createSelector(selectTeachersFeature, (state) => selectStatus(state).loaded),
        },

        programs :{
            all: createSelector(selectProgramsFeature, fromPrograms.selectAll),
            status: createSelector(selectProgramsFeature, (state) => selectStatus(state)),
            loaded: createSelector(selectProgramsFeature, (state) => selectStatus(state).loaded),
        },
        lectures :{
            all: createSelector(selectLecturesFeature, fromLectures.selectAll),
            status: createSelector(selectLecturesFeature, (state) => selectStatus(state)),
            loaded: createSelector(selectLecturesFeature, (state) => selectStatus(state).loaded),
        }
    }
}