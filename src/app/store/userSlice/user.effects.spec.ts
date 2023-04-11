import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { UserEffects } from './user.effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
    LoadUsers,
    LoadUsersFailure,
    LoadUsersSuccess,
    SaveUserAnswer
} from './user.actions';

import { TestScheduler } from 'rxjs/testing';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user';

describe('user Effects', () => {
    const initialState = { users: {} };
    const userService = jasmine.createSpyObj('userService', [
        'getUsers',
    ]);
    let effects: UserEffects;
    let actions: Observable<any>;
    let store: MockStore<any>;
    let testScheduler;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                UserEffects,
                provideMockStore({ initialState }),
                provideMockActions(() => actions),
                { provide: UserService, useValue: userService }
            ]
        });

        effects = TestBed.inject(UserEffects);
        store = TestBed.inject(MockStore);
        store.setState({});

        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });

    describe('LoadUsers effect', () => {
        it('should handle LoadUsers and return a LoadUsersSuccess action', () => {
            const users = [];
            const action = LoadUsers();
            const outcome = LoadUsersSuccess({ users });

            testScheduler.run(({ hot, cold, expectObservable }) => {
                actions = hot('-a', { a: action });
                const response = cold('-b|', { b: users });
                userService.getUsers.and.returnValue(response);

                expectObservable(effects.LoadUsers).toBe('--b', { b: outcome });
            });
        });
    });

    describe('SaveUserAnswer effect', () => {
        it('should handle SaveUserAnswer and return a LoadUsers action', () => {
            const answer = { answer: 'optionOne', authedUser: 1, qid: 2 };
            const users = [];
            const action = SaveUserAnswer(answer);
            const outcome = LoadUsersSuccess({ users });

            testScheduler.run(({ hot, cold, expectObservable }) => {
                actions = hot('-a', { a: action });
                const response = cold('-b|',{b:users});
                userService.getUsers.and.returnValue(response);
                expectObservable(effects.SaveUserAnswer).toBe('--b', { b: outcome });
            });
        });
    });
});
