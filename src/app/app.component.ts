import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { User } from './models/user';
import { LoadUsers } from 'src/app/store/userSlice/user.actions';
import { loadQuestions } from 'src/app/store/questionSlice/question.actions';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.states';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  user : User = new User();
  constructor(private authService : AuthService,
     private store: Store<AppState>) {
    this.authService.user.subscribe(x => this.user = x);
  }

  ngOnInit() {
    this.store.dispatch(LoadUsers());
    this.store.dispatch(loadQuestions());
  }
}
