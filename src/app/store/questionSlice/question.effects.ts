import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { from } from 'rxjs';

import { QuestionService } from '../../services/question.service';
import {
    loadQuestions,
    loadQuestionsSuccess, saveQuestion,
    saveQuestionSuccess, saveQuestionAnswer,
    saveQuestionAnswerSuccess
} from './question.actions';

@Injectable()
export class QuestionEffects {

    constructor(
        private actions: Actions,
        private questionService: QuestionService,
    ) { }

    public saveQuestion = createEffect(() =>
        this.actions.pipe(
            ofType(saveQuestion),
            switchMap(({ optionOneText, optionTwoText, author }) =>
                from(this.questionService.saveQuestion(optionOneText, optionTwoText, author)).pipe(
                    map((question) => {
                        return saveQuestionSuccess({ question: question })
                    }
                    ),
                ))));

    public saveQuestionAnswer = createEffect(() =>
        this.actions.pipe(
            ofType(saveQuestionAnswer),
            switchMap(({ authUserId, qId, answer }) =>
                from(this.questionService.saveQuestionAnswer(authUserId, qId, answer)).pipe(
                    map((answer) => {
                        return saveQuestionAnswerSuccess()
                    }
                    ),
                ))));

    public loadQuestionsSuccess: Observable<any> = createEffect(() => this.actions.pipe(
        ofType(loadQuestionsSuccess),
        tap((questions) => {
        })
    ), { dispatch: false });

    public loadQuestions: Observable<any> = createEffect(() => this.actions.pipe(
        ofType(loadQuestions),
        switchMap(() =>
            from(this.questionService.getQuestion()).pipe(
                map((questions) => {
                    return loadQuestionsSuccess({ questions })
                }
                ),
            )
        )
    ));
}