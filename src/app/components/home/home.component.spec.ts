import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { homeComponent } from './home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  AppState,
} from '../../store/app.states';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {  } from 'src/app/store/questionSlice/question.actions';
import { User } from 'src/app/models/user';
describe('homeComponent', () => {
  let component: homeComponent;
  let fixture: ComponentFixture<homeComponent>;
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
        BrowserAnimationsModule,
        MatGridListModule,
        MatTabsModule,
        MatCardModule,
        MatIconModule,
      ],
      providers: [provideMockStore({initialState})],
      declarations: [ homeComponent ]
    })
    .compileComponents();
    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(homeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create home component', () => {
    expect(component).toBeTruthy();
    
  });
  it('viewPoll button click should dispatch LogIn Action', fakeAsync(() => {
    let button = fixture.debugElement.nativeElement.querySelector('button');
    spyOn(component, 'viewPoll');
    button.click();
    tick();
    fixture.whenStable().then(() => {
      expect(component.viewPoll).toHaveBeenCalled();
    });
  }));
});
