import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LogInComponent } from './log-in.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore, MockStore, } from '@ngrx/store/testing';
import { MatInputModule } from '@angular/material/input';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppState } from '../../store/app.states';
import { LogIn } from '../../store/authSlice/auth.actions'
import { User } from 'src/app/models/user';

describe('LogInComponent', () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;
  let store: MockStore<AppState>;
  const initialState: AppState = {
    authState: {
      isAuthenticated: false,
      user: null,
      errorMessage: null
    },
    userState: {
      users: null,
      error: null,
      isLoading: true,
    },
    questionState: {
      questions: {},
      saving: false,
      savingAnswer: false,
      loading: true
    }
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule
      ],
      providers: [provideMockStore({ initialState })],
      declarations: [LogInComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LogInComponent);
    store = TestBed.inject(MockStore);

    component = fixture.componentInstance;

    fixture.detectChanges();
    // spyOn(store, 'dispatch').and.callFake(() => { });

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Login button click should call onSubmit method and dispatch LogIn Action ', () => {
    const user: User = { answers: {}, questions: [], avatarURL: '', id: '1', name: "mousa" };
    let button = fixture.debugElement.nativeElement.querySelector('button');
    spyOn(component, 'onSubmit');
    button.click();
    component.user = user;
    component.allUsers = [
      {
        id: "1",
        name: "mousa",
        avatarURL: "",
        answers: {
        },
        questions: [],
      },
      {
        id: "2",
        name: "ahmad",
        avatarURL: "https://domain.com/2.svg",
        answers: {
          3: "optionOne",
          2: "optionTwo",
        },
        questions: ["1", "2"],
      },
    ];
    fixture.whenStable().then(() => {
      expect(component.onSubmit).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        LogIn({ user: user })
      );
      
    });
  });
});
