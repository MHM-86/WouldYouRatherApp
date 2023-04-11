import { User } from '../../models/user';
import { LogInSuccess, LogInFailure, LogOut } from './auth.actions';
import { createReducer, on } from '@ngrx/store';

export interface State {
  isAuthenticated: boolean;
  user: User;
  errorMessage: string | null;
}

export const initialState: State = {
  isAuthenticated: false,
  user: null,
  errorMessage: null
};

export const reducer = createReducer(initialState,
  on(LogInSuccess, (state, { user }) => ({
    ...state,
    isAuthenticated: true,
    user: user,
    errorMessage: null
  })),
  on(LogInFailure, (state) => ({
    ...state,
    errorMessage: "The user doesn't exist."
  })),
  on(LogOut, (state) => ({
    ...initialState,
  })),
);