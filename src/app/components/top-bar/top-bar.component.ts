import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState, selectAuthState} from '../../store/app.states';
import { Store } from '@ngrx/store';
import { LogOut } from '../../store/authSlice/auth.actions';
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {
  getState: Observable<any>;
  isAuthenticated: false;
  user = null;
  constructor(
    private store: Store<AppState>
  ) { 
    this.getState = this.store.select(selectAuthState);
  }
  

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
    });
    
  }
  logOut(): void {
    this.store.dispatch(LogOut());
  }
}