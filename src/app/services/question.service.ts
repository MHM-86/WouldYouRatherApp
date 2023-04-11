import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../../utils/_DATA';
import { AppState } from '../store/app.states';

@Injectable()
export class QuestionService {
    constructor(private store: Store<AppState>) { }

    async getQuestion(): Promise<any> {
        return await _getQuestions();
    }

    async saveQuestion(optionOneText, optionTwoText, author): Promise<any> {
        return await _saveQuestion({ optionOneText: optionOneText, optionTwoText: optionTwoText, author: author });
    }

    async saveQuestionAnswer(authedUser: string, qid: string, answer: string): Promise<any> {
        let payload = { authedUser: authedUser, qid: qid, answer: answer };
        return await _saveQuestionAnswer(payload);
    }
}