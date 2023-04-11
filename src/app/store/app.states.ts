import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as auth from './authSlice/auth.reducers';
import * as user from './userSlice/user.reducers';
import * as questions from './questionSlice/question.reducers';
import { Injectable } from '@angular/core';
Injectable ({
  providedIn: "root"
})
export interface AppState {
  authState: auth.State;
  userState: user.UserState;
  questionState: questions.QuestionsState;
}

export const reducers = {
  auth: auth.reducer,
  user: user.userReducer,
  questions: questions.questionReducer,
};

// AppState Selectors
export const selectAuthState = createFeatureSelector<AppState>('auth');
export const selectUserState = createFeatureSelector<AppState>('user');
export const selectQuestionsState = createFeatureSelector<AppState>('questions');

// Auth Selectors
export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: any) => state.isAuthenticated
);

export const selectAuthUser = createSelector(
  selectAuthState,
  (state: any) => state.user
);

// User Selectors
export const selectAllUsers = createSelector(
  selectUserState,
  (state: any) => state.users
);
export const selectAllUsersLoading = createSelector(
  selectUserState,
  (state: any) => state.isLoading
);

// Questions Selectors
export const selectAllQuestions = createSelector(
  selectQuestionsState,
  (state: any) => state.questions
);
export const selectUnansweredQuestions = createSelector([selectAuthUser,selectAllUsers, selectAllQuestions], (authUser, users, questions) => {
    const qIds = Object.keys(users[authUser?.id]?.answers ?? [])
    return Object.values(questions).filter(q => !qIds.includes(q["id"])).sort((a, b) => b["timestamp"] - a["timestamp"])
})

export const selectAnsweredQuestions = createSelector([selectAuthUser, selectAllUsers, selectAllQuestions], (authUser, users, questions) => {
  const qIds = Object.keys(users[authUser?.id]?.answers ?? [])
  console.log("mousa authUser", authUser)
  return Object.values(questions).filter(q => qIds.includes(q["id"])).sort((a, b) => b["timestamp"] - a["timestamp"])
})

export const selectQuestionStatus = createSelector(
  selectQuestionsState,
  (state: any) => state.loading
);

export const selectQuestionSaving = createSelector(
  selectQuestionsState,
  (state: any) => state.saving
);

export const selectSavingAnswer = createSelector(
  selectQuestionsState,
  (state: any) => state.savingAnswer
);


