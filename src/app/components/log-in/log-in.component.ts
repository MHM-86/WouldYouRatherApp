import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import {
  AppState,
  selectAllUsers,
  selectAllUsersLoading,
  selectAuthState
} from '../../store/app.states';
import { LogIn } from '../../store/authSlice/auth.actions';

import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent implements OnInit {
  allUsers: any[] = [];
  myControl = new FormControl('');
  filteredUsers: Observable<string[]>;
  isLoadingUsers: boolean;
  user: User = new User();
  getState: Observable<any>;
  errorMessage: string | null;
  constructor(
    private store: Store<AppState>
  ) {
    this.getState = this.store.select(selectAuthState);
    this.store
      .select(selectAllUsers)
      .subscribe((users: User[]) => {
        let usersIds: string[] = users ? Object.keys(users!) : [];
        usersIds?.forEach((userId) => {
          this.allUsers.indexOf(users[userId]) === -1 ? this.allUsers.push(users[userId]) : '';
        });
      });
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
    this.store.select(selectAllUsersLoading).subscribe((isLoadingUsers) => {
      this.isLoadingUsers = isLoadingUsers;
    });
    this.filteredUsers = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allUsers.filter(user => user.toLowerCase().includes(filterValue));
  }

  onSubmit(): void {
    let user = this.allUsers.find(x => x.name == this.user.name);

    const payload = {
      user: user,
    };
    this.store.dispatch(LogIn(payload));
  }
}