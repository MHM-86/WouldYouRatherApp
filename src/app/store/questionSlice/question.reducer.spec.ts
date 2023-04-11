import * as questionReducer from './question.reducers';
import {
    loadQuestions,
    loadQuestionsSuccess,
    saveQuestion,
    saveQuestionAnswer,
    saveQuestionAnswerSuccess,
    saveQuestionSuccess
} from './question.actions';
import { QuestionService } from '../../services/question.service';

describe('QuestionReducer', () => {
    describe('unknown action', () => {
        it('should return the default state', () => {
            const { initialState } = questionReducer;
            const action = {
                type: 'Unknown'
            };
            const state = questionReducer.questionReducer(initialState, action);

            expect(state).toBe(initialState);
        });
    });

    describe('loadQuestions action', () => {
        it('should update the auth state in an immutable way', () => {
            const { initialState } = questionReducer;
            const newState: questionReducer.QuestionsState =
            {
                questions: {},
                saving: false,
                savingAnswer: false,
                loading: true

            };
            const action = loadQuestions();
            const state = questionReducer.questionReducer(initialState, action);

            expect(state).toEqual(newState);
            expect(state).not.toBe(newState);
        });
    });

    describe('loadQuestionsSuccess action', () => {
        it('should update the auth state in an immutable way', () => {
            const { initialState } = questionReducer;
            const newState: questionReducer.QuestionsState =
            {
                questions: {
                    "1": {
                        id: "1",
                        author: "mousa",
                        timestamp: 1467166872634,
                        optionOne: {
                            votes: ["samer"],
                            text: "option 1",
                        },
                        optionTwo: {
                            votes: [],
                            text: "option 2",
                        },
                    },
                    "2": {
                        id: "2",
                        author: "mohammad",
                        timestamp: 1468479767190,
                        optionOne: {
                            votes: [],
                            text: "option 1",
                        },
                        optionTwo: {
                            votes: ["maher", "ahmad"],
                            text: "option 2",
                        },
                    },
                },
                saving: false,
                savingAnswer: false,
                loading: false

            };
            const action = loadQuestionsSuccess({ questions: newState.questions });
            const state = questionReducer.questionReducer(initialState, action);

            expect(state).toEqual(newState);
            expect(state).not.toBe(newState);
        });
    });
    describe('saveQuestion action', () => {
        it('should update the auth state in an immutable way', () => {
            const { initialState } = questionReducer;
            const newState: questionReducer.QuestionsState =
            {
                questions: {},
                saving: true,
                savingAnswer: false,
                loading: false

            };
            const NewQuestion = {
                id: "1",
                author: "mousa",
                timestamp: 1467166872634,
                optionOne: {
                    votes: ["samer"],
                    text: "option 1",
                },
                optionTwo: {
                    votes: [],
                    text: "option 2",
                },
            };
            const action = saveQuestion({
                author: NewQuestion.author,
                optionOneText: NewQuestion.optionOne.text,
                optionTwoText: NewQuestion.optionTwo.text
            });

            const state = questionReducer.questionReducer(initialState, action);

            expect(state).toEqual(newState);
            expect(state).not.toBe(newState);
        });
    });
    describe('saveQuestionSuccess action', () => {
        it('should update the auth state in an immutable way', () => {
            const { initialState } = questionReducer;
            const newState: questionReducer.QuestionsState =
            {
                questions: {
                    "1": {
                        id: "1",
                        author: "mousa",
                        timestamp: 1467166872634,
                        optionOne: {
                            votes: ["samer"],
                            text: "option 1",
                        },
                        optionTwo: {
                            votes: [],
                            text: "option 2",
                        },
                    },
                },
                saving: false,
                savingAnswer: false,
                loading: false

            };
            const question = newState.questions['1'];
            const action = saveQuestionSuccess({ question: question });

            const state = questionReducer.questionReducer(initialState, action);

            expect(state).toEqual(newState);
            expect(state).not.toBe(newState);
        });
    });

    describe('saveQuestionAnswer action', () => {
        it('should update the auth state in an immutable way', () => {
            const initialState: questionReducer.QuestionsState =
            {
                questions: {
                    "1": {
                        id: "1",
                        author: "mousa",
                        timestamp: 1467166872634,
                        optionOne: {
                            votes: ["samer"],
                            text: "option 1",
                        },
                        optionTwo: {
                            votes: [],
                            text: "option 2",
                        },
                    },
                    "2": {
                        id: "2",
                        author: "mohammad",
                        timestamp: 1468479767190,
                        optionOne: {
                            votes: [],
                            text: "option 1",
                        },
                        optionTwo: {
                            votes: ["maher", "ahmad"],
                            text: "option 2",
                        },
                    },
                },
                saving: false,
                savingAnswer: false,
                loading: false

            };
            const newState: questionReducer.QuestionsState = {
                ...initialState,
                savingAnswer: true,
                questions: {
                    ...initialState.questions,
                    ['1']: {
                        ...initialState.questions['1'],
                        ['optionOne']: {
                            ...initialState.questions['1']['optionOne'],
                            votes: initialState.questions['1']['optionOne'].votes.concat(['ahmad']) ,

                        }
                    }
                }
            }
            const action = saveQuestionAnswer({ answer: 'optionOne', authUserId: 'ahmad', qId: '1' });
            const state = questionReducer.questionReducer(initialState, action);

            expect(state).toEqual(newState);
            expect(state).not.toBe(newState);
        });
    });

    describe('saveQuestionAnswerSuccess action', () => {
        it('should update the auth state in an immutable way', () => {
            const initialState  = {
                questions: {},
                saving: false,
                savingAnswer: true,
                loading: false

            };
            const newState: questionReducer.QuestionsState =
            {
                questions: {},
                saving: false,
                savingAnswer: false,
                loading: false

            };
            const action = saveQuestionAnswerSuccess();
            const state = questionReducer.questionReducer(initialState, action);

            expect(state).toEqual(newState);
            expect(state).not.toBe(newState);
        });
    });
})