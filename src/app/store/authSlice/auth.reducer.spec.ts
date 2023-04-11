import * as authReducer from './auth.reducers';
import {
  LogIn,
  LogInFailure,
  LogInSuccess,
  LogOut
} from './auth.actions';
import { AuthService } from '../../services/auth.service';

describe('AuthReducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = authReducer;
      const action = {
        type: 'Unknown'
      };
      const state = authReducer.reducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LogIn action', () => {
    it('should update the auth state in an immutable way', () => {
      const { initialState } = authReducer;
      const newState: authReducer.State = 
        {
          errorMessage: null,
          isAuthenticated: true,
          user: {answers:{},questions:[],avatarURL:'',id:'1', name: 'mousa'}
        };
      const action = LogInSuccess({ user : {answers:{},questions:[],avatarURL:'',id:'1', name: 'mousa'} });
      const state = authReducer.reducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });
  describe('LogInFailure action', () => {
    it('should update the auth state in an immutable way', () => {
      const { initialState } = authReducer;
      const newState: authReducer.State = 
        {
          errorMessage: "The user doesn't exist.",
          isAuthenticated: false,
          user: null
        };
      const action = LogInFailure({error: "The user doesn't exist."});
      const state = authReducer.reducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('LogOut action', () => {
    it('should update the auth state in an immutable way', () => {
      const { initialState } = authReducer;
      const newState: authReducer.State = 
        {
          errorMessage: null,
          isAuthenticated: false,
          user: null
        };
      const action = LogOut();
      const state = authReducer.reducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });
})