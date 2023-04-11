import * as userReducer from './user.reducers';
import {
    LoadUsers,
    LoadUsersFailure,
    LoadUsersSuccess,
    SaveUserAnswer
} from './user.actions';

describe('UserReducer', () => {
    describe('unknown action', () => {
        it('should return the default state', () => {
            const initialState = userReducer.initialState;
            const action = {
                type: 'Unknown'
            };
            const state = userReducer.userReducer(initialState, action);

            expect(state).toBe(initialState);
        });
    });

    describe('LoadUsers action', () => {
        it('should update the auth state in an immutable way', () => {
            const initialState = userReducer.initialState;
            const newState: userReducer.UserState =
            {
                error: null,
                isLoading: true,
                users: null

            };
            const action = LoadUsers();
            const state = userReducer.userReducer(initialState, action);

            expect(state).toEqual(newState);
            expect(state).not.toBe(newState);
        });
    });

    describe('LoadUsersSuccess action', () => {
        it('should update the auth state in an immutable way', () => {
            const initialState = userReducer.initialState;
            const newState: userReducer.UserState =
            {
                error: null,
                isLoading: false,
                users: {
                    1: {
                        id: "1",
                        name: "mousa",
                        avatarURL: "https://domain.com/1.svg",
                        answers: {
                            1: "optionOne",
                            2: "optionTwo",
                        },
                        questions: ["3", "4"],
                    },
                    2: {
                        id: "2",
                        name: "ahmad",
                        avatarURL: "https://domain.com/2.svg",
                        answers: {
                            3: "optionOne",
                            2: "optionTwo",
                        },
                        questions: ["1", "2"],
                    },
                }

            };
            const action = LoadUsersSuccess({ users: newState.users });
            const state = userReducer.userReducer(initialState, action);

            expect(state).toEqual(newState);
            expect(state).not.toBe(newState);
        });
    });

    describe('LoadUsersFailure action', () => {
        it('should update the auth state in an immutable way', () => {
            const { initialState } = userReducer;
            const newState: userReducer.UserState =
            {
                error: "Error loading users",
                isLoading: false,
                users: null
            };
            const action = LoadUsersFailure({ error: "Error loading users" });
            const state = userReducer.userReducer(initialState, action);

            expect(state).toEqual(newState);
            expect(state).not.toBe(newState);
        });
    });

    describe('SaveUserAnswer action', () => {
        it('should update the auth state in an immutable way', () => {
            const initialState: userReducer.UserState =
            {
                error: null,
                isLoading: false,
                users: {
                    1: {
                        id: "1",
                        name: "mousa",
                        avatarURL: "https://domain.com/1.svg",
                        answers: {
                            1: "optionOne",
                        },
                        questions: ["3", "4"],
                    },
                    2: {
                        id: "2",
                        name: "ahmad",
                        avatarURL: "https://domain.com/2.svg",
                        answers: {
                            3: "optionOne",
                            2: "optionTwo",
                        },
                        questions: ["1", "2"],
                    },
                }

            };
            const newState: userReducer.UserState = {
                ...initialState,
                users: {
                    ...initialState.users,
                    1: {
                        ...initialState.users['1'],
                        answers: {
                            ...initialState.users['1'].answers,
                            [2]: 'optionOne',
                        }
                    }
                }
            }
            const action = SaveUserAnswer({ answer: 'optionOne', authedUser: 1, qid: 2 });
            const state = userReducer.userReducer(initialState, action);

            expect(state).toEqual(newState);
            expect(state).not.toBe(newState);
        });
    });
})