import { createAction, props } from '@ngrx/store';
import { Tag } from './model';
import {CustomResponse} from 'src/app/store/store.interface'

export const loadTags = createAction(
    '[Root/Lookups] loadTags'
);

export const loadTagsSuccess = createAction(
    '[Root/Lookups] loadTags Success',
    props<{ response: CustomResponse<Tag[]> }>()
);

export const loadTagsFailure = createAction(
    '[Root/Lookups] loadTags Failure',
    props<{ error: any }>()
);




