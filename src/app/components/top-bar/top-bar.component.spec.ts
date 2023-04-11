import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router, RouterModule } from '@angular/router';
import { TopBarComponent } from './top-bar.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import {
    AppState,
} from '../../store/app.states';
import { MatToolbarModule } from '@angular/material/toolbar';
import { User } from 'src/app/models/user';
import { LogOut } from 'src/app/store/authSlice/auth.actions';
describe('top-barComponent', () => {
    let component: TopBarComponent;
    let fixture: ComponentFixture<TopBarComponent>;
    let store: MockStore<AppState>;
    const user : User = { answers: {}, questions: [], avatarURL: '', id: '1', name: "mousa" };
    let activatedRouteSpy;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MatToolbarModule,
                BrowserAnimationsModule,
                MatIconModule,
                RouterModule.forRoot([])

            ],
            declarations: [TopBarComponent],
            providers: [
                provideMockStore({}),
                {
                    provide: ActivatedRoute,
                    useValue: activatedRouteSpy
                },
                { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } },
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TopBarComponent);
        component = fixture.componentInstance;
        component.user = user;
        store = TestBed.inject(MockStore);
        fixture.detectChanges();
    });

    it('should create', () => {
        
        expect(component).toBeTruthy();
    });

    it('log out button click should dispatch LogOut Action', fakeAsync(() => {
    let button = fixture.debugElement.nativeElement.querySelector('button');
    spyOn(component, 'logOut');
    button.click();
    tick();
    fixture.whenStable().then(() => {
      expect(component.logOut).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        LogOut()
      );
    });
  }));

});
