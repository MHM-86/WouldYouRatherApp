import { User } from '../../models/user';
import { SaveUserAnswer, LoadUsers, LoadUsersSuccess, LoadUsersFailure } from './user.actions';
import { createReducer, on } from '@ngrx/store';

export interface UserState {
    users: { [key: string]: User };
    isLoading: boolean;
    error: string;
}

export const initialState: UserState = {
    users: null,
    error: null,
    isLoading: true,
};

export const userReducer = createReducer(initialState,
    on(SaveUserAnswer, (state, { authedUser, qid, answer }) => {
        let newUsers: { [key: string]: User } = {
            ...state.users,
            [authedUser]: {
              ...state.users[authedUser],
              answers: {
                ...state.users[authedUser].answers,
                [qid]: answer,
              },
            },
          };
          return {
            ...state,
            users: newUsers,
          };
    }),
    on(LoadUsers, (state) => ({
        ...state,
        isLoading: true
    })),
    on(LoadUsersSuccess, (state, { users }) => ({
        ...state,
        users: users,
        isLoading: false,
        error: null,
    })),
    on(LoadUsersFailure, (state, { error }) => ({
        ...state,
        error: error,
    })),
);
