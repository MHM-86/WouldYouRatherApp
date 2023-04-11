import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AddQuestionComponent } from './add-question.component';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { saveQuestion } from '../../store/questionSlice/question.actions'
import {
  AppState,
} from '../../store/app.states';
import { User } from 'src/app/models/user';

describe('AddQuestionComponent', () => {
  let component: AddQuestionComponent;
  let fixture: ComponentFixture<AddQuestionComponent>;
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule
      ],
      providers: [provideMockStore({initialState})],
      declarations: [ AddQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddQuestionComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Add button click should dispatch saveQuestion Action', fakeAsync(() => {
    const user : User = { answers: {}, questions: [], avatarURL: '', id: '1', name: "mousa" };
    component.optionOneText = "optionOne";
    component.optionTwoText = "optionTwo";
    component.authenticatedUser = user;
    let button = fixture.debugElement.nativeElement.querySelector('button');
    spyOn(component, 'onSubmit');
    button.click();
    tick();
    fixture.whenStable().then(() => {
      expect(component.onSubmit).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        saveQuestion({ author:component.authenticatedUser.id,optionOneText:component.optionOneText ,optionTwoText:component.optionTwoText  })
      );
    });
  }));
});
