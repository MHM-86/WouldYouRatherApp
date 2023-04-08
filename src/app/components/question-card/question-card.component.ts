import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { LoadUsers } from 'src/app/store/userSlice/user.actions';
import { saveQuestionAnswer } from 'src/app/store/questionSlice/question.actions';
import { SaveUserAnswer } from 'src/app/store/userSlice/user.actions';

import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/models/question';
import { FormControl, Validators } from "@angular/forms";
import {
  AppState,
  selectAllQuestions,
  selectAuthState,
  selectAllUsers
} from '../../store/app.states';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.css']
})
export class QuestionCardComponent implements OnInit {
  Users: { [key: string]: User };
  Questions: { [key: string]: Question };;
  isAuthenticated: false;
  authenticatedUser: User;

  questionId: string;
  authUserAnswer: string;
  question: Question;
  votesCount: number;
  OptionOneVotes: number;
  OptionTwoVotes: number;
  OptionOnePercentage: number;
  OptionTwoPercentage: number;
  newAnswer = new FormControl("", [Validators.required]);
  user: User;
  getState: Observable<any>;
  AuthorVote: boolean;



  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router) {

    this.getState = this.store.select(selectAuthState);

    this.store
      .select(selectAllUsers)
      .subscribe((users) => { this.Users = users })

    this.store
      .select(selectAllQuestions)
      .subscribe((questions) => { this.Questions = questions; });
  }

  getAuthorName(questionAuthor: string): string {
    return this.Users[questionAuthor].name;
  }

  getAuthorAvatar(questionAuthor: string): string {
    return this.Users[questionAuthor].avatarURL;
  }
  ngOnInit() {
    this.store.dispatch(LoadUsers());
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.authenticatedUser = state.user;
    });
    let currenQuestionId = this.route.snapshot.params['questionId'];
    this.questionId = currenQuestionId;
    this.question = this.Questions[this.questionId];
    this.authUserAnswer = this.Users[this.authenticatedUser.id].answers[currenQuestionId];
    this.OptionOneVotes = this.question.optionOne.votes.length;
    this.OptionTwoVotes = this.question.optionTwo.votes.length;
    this.votesCount = this.question.optionOne.votes.length + this.question.optionTwo.votes.length;
    this.OptionOnePercentage = Number(((this.OptionOneVotes / this.votesCount) * 100).toFixed(1));
    this.OptionTwoPercentage = Number(((this.OptionTwoVotes / this.votesCount) * 100).toFixed(1));
    this.AuthorVote = this.authUserAnswer === "optionOne";
  }

  SubmitAnswer = () => {
    let payload = { authUserId: this.authenticatedUser.id, qId: this.questionId, answer: this.newAnswer.value }
    this.store.dispatch(saveQuestionAnswer(payload));
    this.authUserAnswer = this.authenticatedUser.answers[this.questionId];
    this.store.dispatch(SaveUserAnswer({ authedUser: this.authenticatedUser.id, qid: this.questionId, answer: this.newAnswer.value }));

    this.router.navigate(['/home']);
  };
}
