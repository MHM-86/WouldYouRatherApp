import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { UserService } from '../../services/user.service';
import { SaveUserAnswer, LoadUsersSuccess, LoadUsersFailure, LoadUsers } from './user.actions';

@Injectable()
export class UserEffects {

    constructor(
        private actions: Actions,
        private userService: UserService,
    ) { }

    public LoadUsersSuccess: Observable<any> = createEffect(() => this.actions.pipe(
        ofType(LoadUsersSuccess),
        tap((users) => {
        })
    ), { dispatch: false });

    public LoadUsersFailure: Observable<any> = createEffect(() => this.actions.pipe(
        ofType(LoadUsersFailure)
    ), { dispatch: false });

    public LoadUsers: Observable<any> = createEffect(() => this.actions.pipe(
        ofType(LoadUsers),
        switchMap(() =>
            from(this.userService.getUsers()).pipe(
                map((users) => {
                    return LoadUsersSuccess({ users })
                }
                ),
                catchError((error) => {
                    return of(LoadUsersFailure({ error: error }))
                }
                ))
        )));

    public SaveUserAnswer: Observable<any> = createEffect(() => this.actions.pipe(
        ofType(SaveUserAnswer),
        switchMap(() =>
            from(this.userService.getUsers()).pipe(
                map((users) => {
                    return LoadUsersSuccess({ users })
                }
                ),
                catchError((error) => {
                    return of(LoadUsersFailure({ error: error }))
                }
                )))));
}