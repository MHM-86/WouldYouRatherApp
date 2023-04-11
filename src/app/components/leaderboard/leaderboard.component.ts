import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { ActivatedRoute } from '@angular/router';
import { AppState, selectAuthState, selectAllUsers } from '../../store/app.states';
@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  Users: User[];
  authenticatedUser: User;
  getState: Observable<any>;

  constructor(private store: Store<AppState>,
    private router: ActivatedRoute) {

    this.getState = this.store.select(selectAuthState);
    this.store
      .select(selectAllUsers)
      .subscribe((users: User[]) => {
        this.Users = Object.values(users).sort(
          (a, b) =>
            Object.values(b.answers).length +
            Object.values(b.questions).length -
            (Object.values(a.answers).length + Object.values(a.questions).length)
        )
      });
  }
  getAnsweredQuestionsCount = (user: User): number => {
    return Object.values(user.answers).length;
  }
  getCreatedQuestionsCount = (user: User): number => {
    return Object.values(user.questions).length;
  }
  ngOnInit() {
    this.getState.subscribe((state) => {
      this.authenticatedUser = state.user;
    });
  }

}



