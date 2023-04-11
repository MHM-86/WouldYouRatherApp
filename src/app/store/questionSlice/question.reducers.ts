import { Question } from '../../models/question';
import {
    loadQuestions,
    loadQuestionsSuccess, saveQuestion,
    saveQuestionSuccess, saveQuestionAnswer,
    saveQuestionAnswerSuccess
} from './question.actions';
import { createReducer, on } from '@ngrx/store';
import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../../../utils/_DATA';


export interface QuestionsState {
    questions: { [key: string]: Question };
    saving: boolean,
    savingAnswer: boolean,
    loading: boolean
}

export const initialState = {
    questions: {},
    saving: false,
    savingAnswer: false,
    loading: false
};

export const questionReducer = createReducer(initialState,
    on(loadQuestions, (state) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(loadQuestionsSuccess, (state, action) => {
        return {
            ...state,
            loading: false,
            questions: {
                ...action.questions
            }
        }
    }),
    on(saveQuestion, (state) => ({
        ...state,
        saving: true
    })),
    on(saveQuestionSuccess, (state, action) => {
        let question = action.question;
        return {
            ...state,
            questions: {
                ...state.questions,
                [question.id]: question
            },
            saving: false
        }
    }),
    on(saveQuestionAnswerSuccess, (state) => ({
        ...state,
        savingAnswer: false
    })),
    on(saveQuestionAnswer, (state, action) => {
        const { questions } = state
        return {
            ...state,
            savingAnswer: true, 
            questions: {
                ...questions,
                [action.qId]: {
                    ...questions[action.qId],
                    [action.answer]: {
                        ...questions[action.qId][action.answer],
                        votes: questions[action.qId][action.answer].votes.concat([action.authUserId])
                    }
                }
            }
        }
    })
);