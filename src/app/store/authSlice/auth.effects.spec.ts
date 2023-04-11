import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { AuthEffects } from './auth.effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
 LogIn,
 LogInFailure,
 LogInSuccess,
 LogOut
} from './auth.actions';

import { TestScheduler } from 'rxjs/testing';
import { AuthService } from '../../services/auth.service';

describe('AuthEffects', () => {
  const initialState = { shows: [] };
  const authService = jasmine.createSpyObj('authService', [
    'logIn',
    'logOut'
  ]);
  let effects: AuthEffects;
  let actions: Observable<any>;
  let store: MockStore<any>;
  let testScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockStore({ initialState }),
        provideMockActions(() => actions),
        { provide: AuthService, useValue: authService }
      ]
    });

    effects = TestBed.inject(AuthEffects);
    store = TestBed.inject(MockStore);
    store.setState({});

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('LogIn effect', () => {
    it('should handle LogIn and return a LogInSuccess action', () => {
      const user = {answers:{},questions:[],avatarURL:'',id:'1', name: 'mousa'};
      const action = LogIn({user:user});
      const outcome = LogInSuccess({user:user});

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: action });
        const response = cold('-b|', { b: user });
        authService.logIn.and.returnValue(response);

        expectObservable(effects.LogIn).toBe('--b', { b: outcome });
      });
    });
  });
});
