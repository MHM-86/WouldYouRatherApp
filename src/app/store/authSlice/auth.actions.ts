import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  LOGOUT = '[Auth] Logout',
}

export const LogIn = createAction (
  AuthActionTypes.LOGIN,
  props<{user : User}>()
);

export const LogInSuccess = createAction(
  AuthActionTypes.LOGIN_SUCCESS,
  props<{user : User}>()
);

export const LogInFailure = createAction (
  AuthActionTypes.LOGIN_FAILURE,
  props<{error : string}>()
);

export const LogOut = createAction(
 AuthActionTypes.LOGOUT,
)
