import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  AppState,
  selectAuthState,
  selectAnsweredQuestions,
  selectUnansweredQuestions,
  selectAllUsers
} from '../../store/app.states';
import { LogOut } from '../../store/authSlice/auth.actions';
import { User } from '../../models/user';
import { Question } from 'src/app/models/question';
import { Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatTabsModule } from '@angular/material/tabs';
@Component({
  selector: 'app-landing',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class homeComponent implements OnInit {
  allUsers: User[];
  selectedTab: number = 0;
  Questions: Question[];
  getState: Observable<any>;
  isAuthenticated: false;
  user = null;
  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    this.getState = this.store.select(selectAuthState);
    this.getState.subscribe((state) => {
      this.user = state.user;
    });
    this.store
      .select(selectAllUsers)
      .subscribe((users: User[]) => {
        this.allUsers = Object.values(users)
      });
    this.getQuestionbyTab(this.selectedTab);
  }
  getAuthorName(questionAuthor: string): string {
    return this.allUsers.find(u => u.id == questionAuthor).name;
  }

  getAuthorAvatar(questionAuthor: string): string {
    return this.allUsers.find(u => u.id == questionAuthor).avatarURL;
  }

  handleOnClick = () => {
    this.router.navigate(['home']);
  }
  getQuestionbyTab = (tabIndex: number) => {

    this.store
      .select(tabIndex === 1 ? selectAnsweredQuestions : selectUnansweredQuestions)
      .subscribe((questions: Question[]) => {
        this.Questions = Object.values(questions);
      });
    this.Questions?.sort((a, b) => b.timestamp - a.timestamp);
  }

  changeTab = (tabChangeEvent: MatTabChangeEvent) => {
    this.selectedTab = tabChangeEvent.index;
    this.Questions = [];
    this.getQuestionbyTab(this.selectedTab);
  }

  ngOnInit() : void {}

  logOut(): void {
    this.store.dispatch(LogOut());
  }
  viewPoll(questionId) {
    this.router.navigate(['/home', questionId]);
  }
}