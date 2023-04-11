import { createAction, props } from '@ngrx/store';

export enum AuthActionTypes {
    SAVE_USER_ANSWER = '[User] Save User Answer',
    LOAD_USERS_SUCCESS = '[User] Load Users Success',
    LOAD_USERS_FAILURE = '[User] Load Users Failure',
    LOAD_USERS = '[User] Load Users',
}

export const SaveUserAnswer = createAction (
  AuthActionTypes.SAVE_USER_ANSWER,
  props<{ authedUser: any, qid: any, answer: any }>()
);

export const LoadUsersSuccess = createAction(
  AuthActionTypes.LOAD_USERS_SUCCESS,
  props<{users : {}}>()
);

export const LoadUsersFailure = createAction (
  AuthActionTypes.LOAD_USERS_FAILURE,
  props<{error : string}>()
);

export const LoadUsers = createAction(
 AuthActionTypes.LOAD_USERS,
)
