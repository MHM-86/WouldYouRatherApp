import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { QuestionEffects } from './question.effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
    loadQuestions,
    loadQuestionsSuccess,
    saveQuestion,
    saveQuestionAnswer,
    saveQuestionAnswerSuccess,
    saveQuestionSuccess
} from './question.actions';

import { TestScheduler } from 'rxjs/testing';
import { QuestionService } from '../../services/question.service';
import { Question } from 'src/app/models/question';

describe('questionEffects', () => {
    const initialState = { questions: [] };
    const questionService = jasmine.createSpyObj('questionService', [
        'getQuestion',
        'saveQuestion',
        'saveQuestionAnswer',
    ]);
    let effects: QuestionEffects;
    let actions: Observable<any>;
    let store: MockStore<any>;
    let testScheduler;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                QuestionEffects,
                provideMockStore({ initialState }),
                provideMockActions(() => actions),
                { provide: QuestionService, useValue: questionService }
            ]
        });

        effects = TestBed.inject(QuestionEffects);
        store = TestBed.inject(MockStore);
        store.setState({});

        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });

    describe('loadQuestions effect', () => {
        it('should handle loadQuestions and return a loadQuestionsSuccess action', () => {
            const questions = [];
            const action = loadQuestions();
            const outcome = loadQuestionsSuccess({ questions });

            testScheduler.run(({ hot, cold, expectObservable }) => {
                actions = hot('-a', { a: action });
                const response = cold('-b|', { b: questions });
                questionService.getQuestion.and.returnValue(response);

                expectObservable(effects.loadQuestions).toBe('--b', { b: outcome });
            });
        });
    });

    describe('saveQuestion effect', () => {
        it('should handle saveQuestion and return a saveQuestionSuccess action', () => {
            const NewQuestionValues = {
                author: "mousa",
                optionOneText: "option 1",
                optionTwoText: "option 2"
            };

            const createdQuestion : Question = {
                id: "1",
                author: "mousa",
                timestamp: 1467166872634,
                optionOne: {
                    votes: [],
                    text: "option 1",
                },
                optionTwo: {
                    votes: [],
                    text: "option 2",
                },
            };
            const action = saveQuestion(NewQuestionValues);
            const outcome = saveQuestionSuccess({question:createdQuestion});

            testScheduler.run(({ hot, cold, expectObservable }) => {
                actions = hot('-a', { a: action });
                const response = cold('-b|', { b: createdQuestion });
                questionService.saveQuestion.and.returnValue(response);

                expectObservable(effects.saveQuestion).toBe('--b', { b: outcome });
            });
        });
    });

    describe('saveQuestionAnswer effect', () => {
        it('should handle saveQuestionAnswer and return a saveQuestionAnswerSuccess action', () => {
            const NewQuestionAnswer = { answer: 'optionOne', authUserId: 'ahmad', qId: '1' };

            
            const action = saveQuestionAnswer(NewQuestionAnswer);
            const outcome = saveQuestionAnswerSuccess();

            testScheduler.run(({ hot, cold, expectObservable }) => {
                actions = hot('-a', { a: action });
                const response = cold('-b|');
                questionService.saveQuestionAnswer.and.returnValue(response);

                expectObservable(effects.saveQuestionAnswer).toBe('--b', { b: outcome });
            });
        });
    });
});
