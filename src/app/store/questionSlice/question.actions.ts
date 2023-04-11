import { createAction, props } from '@ngrx/store';
import { Question } from '../../models/question';

export enum QuestionActionTypes {
    LOAD_QUESTIONS = '[Question] Load Questions',
    LOAD_QUESTION_SUCCESS = '[Question] Load Questions Success',
    SAVE_QUESTION = '[Question] Save Question',
    SAVE_QUESTION_SUCCESS = '[Question] Save Question Success',
    SAVE_QUESTION_ANSWER = '[Question] Save Question Answer',
    SAVE_QUESTION_ANSWER_SUCCESS = '[Question] Save Question Answer Success',
}

export const loadQuestions = createAction (
  QuestionActionTypes.LOAD_QUESTIONS,
);

export const loadQuestionsSuccess = createAction(
  QuestionActionTypes.LOAD_QUESTION_SUCCESS,
  props<{questions : {}}>()
);

export const saveQuestion = createAction (
  QuestionActionTypes.SAVE_QUESTION,
  props<{ optionOneText: string; optionTwoText: string; author: string}>()
);

export const saveQuestionSuccess = createAction(
  QuestionActionTypes.SAVE_QUESTION_SUCCESS,
  props<{ question: Question}>()
);

export const saveQuestionAnswer = createAction(
  QuestionActionTypes.SAVE_QUESTION_ANSWER,
  props<{ authUserId: string; qId: string; answer: string }>()
 );
 export const saveQuestionAnswerSuccess = createAction(
  QuestionActionTypes.SAVE_QUESTION_ANSWER_SUCCESS
 );
