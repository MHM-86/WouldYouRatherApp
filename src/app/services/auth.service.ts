import { _getUsers } from '../../utils/_DATA';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/user';


@Injectable()
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  constructor() {
    this.userSubject = new BehaviorSubject<User>(null);
    this.user = this.userSubject.asObservable()
  }

  logIn(user: User): Observable<any> {
    if (user) {
      this.userSubject.next(user);
      return of(user);
    }
    return null;
  }

  logOut() {
    this.userSubject.next(null);
  }
}