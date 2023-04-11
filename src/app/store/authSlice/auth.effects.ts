import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { LogIn, LogInSuccess, LogInFailure, LogOut} from './auth.actions';

@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
  ) { }

  public LogIn = createEffect(() =>
    this.actions.pipe(
      ofType(LogIn),
      switchMap(payload => {
        return this.authService.logIn(payload.user).pipe(
          map((user) => {
            return LogInSuccess({ user: payload.user });
          }),
          catchError((error) => {
            return of(LogInFailure({ error: error }));
          }));
      })));

  public LogInSuccess: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(LogInSuccess),
    tap((user) => {
      this.router.navigateByUrl('home');
    })
  ), { dispatch: false });

  LogInFailure: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(LogInFailure)
  ), { dispatch: false });

  public LogOut: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(LogOut),
    tap((user) => {
      this.authService.logOut();
      this.router.navigateByUrl('/log-in');
    })), { dispatch: false });
}