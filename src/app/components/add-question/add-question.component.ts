import { Component, OnInit } from '@angular/core';
import { AppState, selectAuthState } from "../../store/app.states";
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { saveQuestion } from 'src/app/store/questionSlice/question.actions';
import { User } from '../../models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  saving: boolean;
  optionOneText: string;
  optionTwoText: string;
  authenticatedUser: User;
  getState: Observable<any>;

  constructor(private store: Store<AppState>,
    private router: Router) {
    this.getState = this.store.select(selectAuthState);
  }
  onSubmit = () => {
    this.store.dispatch(saveQuestion({ optionOneText: this.optionOneText, optionTwoText: this.optionTwoText, author: this.authenticatedUser.id }))
    this.router.navigate(['home']);
  };
  ngOnInit() {
    this.getState.subscribe((state) => {
      this.authenticatedUser = state.user;
    });
  }

}