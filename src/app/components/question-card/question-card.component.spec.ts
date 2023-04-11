import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router, RouterModule } from '@angular/router';
import { QuestionCardComponent } from './question-card.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import {
  AppState,
} from '../../store/app.states';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { Question } from 'src/app/models/question';
import { User } from 'src/app/models/user';
import { SaveUserAnswer } from 'src/app/store/userSlice/user.actions';
describe('QuestionCardComponent', () => {
  let component: QuestionCardComponent;
  let fixture: ComponentFixture<QuestionCardComponent>;
  let store: MockStore<AppState>;

  const initialState = {
    authState: {
      isAuthenticated: false,
      user: {
        sarahedo: {
          id: "sarahedo",
          name: "Sarah Edo",
          avatarURL: "https://avatars.dicebear.com/api/adventurer/sarahedo.svg",
          answers: {
            "8xf0y6ziyjabvozdd253nd": "optionOne",
          },
          questions: ["8xf0y6ziyjabvozdd253nd"],
        },
      },
      errorMessage: ''
    },
    userState: {
      users: {
        sarahedo: {
          id: "sarahedo",
          name: "Sarah Edo",
          avatarURL: "https://avatars.dicebear.com/api/adventurer/sarahedo.svg",
          answers: {
            "8xf0y6ziyjabvozdd253nd": "optionOne",
          },
          questions: ["8xf0y6ziyjabvozdd253nd"],
        },
      },
      error: null,
      isLoading: true,
    },
    questionState: {
      questions:
      {
        "8xf0y6ziyjabvozdd253nd": {
          id: "8xf0y6ziyjabvozdd253nd",
          author: "sarahedo",
          timestamp: 1467166872634,
          optionOne: {
            votes: ["sarahedo"],
            text: "have horrible short term memory",
          },
          optionTwo: {
            votes: [],
            text: "have horrible long term memory",
          },
        },
      },
      saving: false,
      savingAnswer: false,
      loading: true
    }
  };

  let activatedRouteSpy;
  beforeEach(async () => {
    activatedRouteSpy = {
      snapshot: {
        params: convertToParamMap({
          questionId: '8xf0y6ziyjabvozdd253nd'
        })
      }
    };
    await TestBed.configureTestingModule({
      imports: [
        MatRadioModule,
        MatDividerModule,
        MatGridListModule,
        MatCardModule,
        MatChipsModule,
        MatProgressBarModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([])

      ],
      declarations: [QuestionCardComponent],
      providers: [provideMockStore({ initialState }),
      {
        provide: ActivatedRoute,
        useValue: activatedRouteSpy
      },
      { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(QuestionCardComponent);
    component = fixture.componentInstance;
    component.Questions = initialState.questionState.questions;
    component.Users = initialState.userState.users;
    
    component.authenticatedUser = Object.values(initialState.authState.user)[0];
    component.question = Object.values(initialState.questionState.questions)[0];
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });

  it('Submit Answer button click should call SubmitAnswer method and dispatch saveQuestionAnser Action ', fakeAsync(() => {
    const user: User = { answers: {}, questions: [], avatarURL: '', id: '1', name: "mousa" };
    let button = fixture.debugElement.nativeElement.querySelector('button');
    spyOn(component, 'SubmitAnswer');
    // button.click();
    component.authenticatedUser = user;
    component.authUserAnswer = "optionOne";
    component.Users = {
      1:{
        id: "1",
        name: "mousa",
        avatarURL: "",
        answers: {
        },
        questions: [],
      },
      2:{
        id: "2",
        name: "ahmad",
        avatarURL: "https://domain.com/2.svg",
        answers: {
          3: "optionOne",
          2: "optionTwo",
        },
        questions: ["1", "2"],
      },
    };
    tick();
    let payload = { authedUser: component.authenticatedUser.id, qid: 2, answer: component.authUserAnswer  }
    fixture.whenStable().then(() => {
      expect(component.SubmitAnswer).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        SaveUserAnswer(payload )
      );
      
    });
  }));

});
