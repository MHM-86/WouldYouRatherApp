import * as fromSelectors from './app.states';
import * as questionReducer from './questionSlice/question.reducers';
import * as user from './userSlice/user.reducers';
import * as auth from './authSlice/auth.reducers';

describe('Question Selectors', () => {
    describe('All Question Selector', () => {
        it('should select All Questions', () => {
            const initialState: questionReducer.QuestionsState = {
                questions: {
                    "1": {
                        id: "1",
                        author: "mousa",
                        timestamp: 1467166872634,
                        optionOne: {
                            votes: ["samer"],
                            text: "option 1",
                        },
                        optionTwo: {
                            votes: [],
                            text: "option 2",
                        },
                    },
                    "2": {
                        id: "2",
                        author: "mohammad",
                        timestamp: 1468479767190,
                        optionOne: {
                            votes: [],
                            text: "option 1",
                        },
                        optionTwo: {
                            votes: ["maher", "ahmad"],
                            text: "option 2",
                        },
                    },
                },
                saving: false,
                savingAnswer: false,
                loading: false

            };
            const result = fromSelectors.selectAllQuestions.projector(initialState);
            expect(Object.keys(result).length).toEqual(2);
            expect(Object.values(result)[0]['id']).toEqual("1");
        });



    });

    describe('Answered Questions Selector', () => {
        it('should select answeredQuestion', () => {

            const state: fromSelectors.AppState = {
                authState: {
                    errorMessage: null,
                    isAuthenticated: true,
                    user: {
                        answers: {},
                        questions: [],
                        avatarURL: '',
                        id: '1',
                        name: 'mousa'
                    }
                },
                questionState: {
                    questions: {
                        "1": {
                            id: "1",
                            author: "mousa",
                            timestamp: 1467166872634,
                            optionOne: {
                                votes: ["samer", "mousa"],
                                text: "option 1",
                            },
                            optionTwo: {
                                votes: [],
                                text: "option 2",
                            },
                        },
                        "2": {
                            id: "2",
                            author: "mohammad",
                            timestamp: 1468479767190,
                            optionOne: {
                                votes: [],
                                text: "option 1",
                            },
                            optionTwo: {
                                votes: ["maher", "ahmad",'mousa'],
                                text: "option 2",
                            },
                        },
                    },
                    saving: false,
                    savingAnswer: false,
                    loading: false

                },
                userState: {
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


                }
            };
            const answeredQuestion = fromSelectors.selectAnsweredQuestions.projector(state.authState.user,
                state.userState.users,
                state.questionState.questions);
                console.log("result", answeredQuestion)
            expect(Object.keys(answeredQuestion).length).toEqual(1);
            expect(Object.values(answeredQuestion)[0]['id']).toEqual('1');
        });
    });
    describe('Unanswered Questions Selector', () => {
        it('should select unansweredQuestion', () => {
            const user =  {
                answers: {},
                questions: [],
                avatarURL: '',
                id: '1',
                name: 'mousa'
            };
            const state: fromSelectors.AppState = {
                authState: {
                    errorMessage: null,
                    isAuthenticated: true,
                    user: {
                        answers: {},
                        questions: [],
                        avatarURL: '',
                        id: '1',
                        name: 'mousa'
                    }
                },
                questionState: {
                    questions: {
                        "1": {
                            id: "1",
                            author: "mousa",
                            timestamp: 1467166872634,
                            optionOne: {
                                votes: ["samer", "mousa"],
                                text: "option 1",
                            },
                            optionTwo: {
                                votes: [],
                                text: "option 2",
                            },
                        },
                        "2": {
                            id: "2",
                            author: "mohammad",
                            timestamp: 1468479767190,
                            optionOne: {
                                votes: [],
                                text: "option 1",
                            },
                            optionTwo: {
                                votes: ["maher", "ahmad",'mousa'],
                                text: "option 2",
                            },
                        },
                    },
                    saving: false,
                    savingAnswer: false,
                    loading: false

                },
                userState: {
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


                }
            };
            const unansweredQuestion = fromSelectors.selectUnansweredQuestions.projector(state.authState.user,
                state.userState.users,
                state.questionState.questions);
            expect(Object.keys(unansweredQuestion).length).toEqual(1);
            expect(Object.values(unansweredQuestion)[0]['id']).toEqual('2');
        });



    });
});

describe('User Selectors', () => {
    describe('All User Selector', () => {
        it('should select All User', () => {
            const state: user.UserState = {
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
            const users = fromSelectors.selectAllUsers.projector(state);
            expect(Object.keys(users).length).toEqual(2);
            expect(Object.values(users)[0]['name']).toEqual("mousa");
        });



    });

    describe('Loading Users Selector', () => {
        it('should select isLoading from state', () => {
            const state: user.UserState = {
                error: null,
                isLoading: true,
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
                }
        };
            const loadingUsers = fromSelectors.selectAllUsersLoading.projector(state);
                console.log("result", loadingUsers)
            expect(loadingUsers).toEqual(true);
        });
    });
});

describe('Authentication Selectors', () => {
    describe('selectAuthUser Selector', () => {
        it('should select the authenticated  user', () => {
            const state: auth.State = {
                    errorMessage: null,
                    isAuthenticated: true,
                    user: {
                            id: "1",
                            name: "mousa",
                            avatarURL: "https://domain.com/1.svg",
                            answers: {
                                1: "optionOne",
                            },
                            questions: ["3", "4"],
                        },
                        
                    };
            const authenticatedUser = fromSelectors.selectAuthUser.projector(state);
            expect(authenticatedUser.id).toEqual('1');
        });

    });

    describe('selectIsAuthenticated Selector', () => {
        it('should select isAuthenticated', () => {
            const state: auth.State = {
                    errorMessage: null,
                    isAuthenticated: true,
                    user: {
                            id: "1",
                            name: "mousa",
                            avatarURL: "https://domain.com/1.svg",
                            answers: {
                                1: "optionOne",
                            },
                            questions: ["3", "4"],
                        },
                        
                    };
            const isAuthenticated = fromSelectors.selectIsAuthenticated.projector(state);
            expect(isAuthenticated).toEqual(true);
        });

    });
});
