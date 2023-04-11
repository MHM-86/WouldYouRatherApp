import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardComponent } from './leaderboard.component';

import { provideMockStore, MockStore,  } from '@ngrx/store/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  AppState,
} from '../../store/app.states';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';


describe('LeaderboardComponent', () => {
  let component: LeaderboardComponent;
  let fixture: ComponentFixture<LeaderboardComponent>;
  let mockStore: MockStore<AppState>;
  const initialState = { 
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
        RouterTestingModule,
        BrowserAnimationsModule,
        MatGridListModule,
        MatTabsModule,
        MatCardModule,
        MatIconModule,
      ],
      providers: [provideMockStore({initialState})],
      declarations: [ LeaderboardComponent ]
    })
    .compileComponents();
    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(LeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
