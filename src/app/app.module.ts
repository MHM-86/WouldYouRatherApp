import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { homeComponent } from './components/home/home.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/authSlice/auth.effects';
import { UserEffects } from './store/userSlice/user.effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/app.states';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule } from '@angular/material/progress-bar';
import {MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatRadioModule } from '@angular/material/radio';
import { QuestionEffects } from './store/questionSlice/question.effects';
import { QuestionService } from './services/question.service';
import { authGuard } from "./services/authGuard.service";
import { QuestionCardComponent } from './components/question-card/question-card.component';
import { AddQuestionComponent } from './components/add-question/add-question.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { CdkColumnDef } from '@angular/cdk/table';
@NgModule({
  imports: [
    BrowserModule,
    MatGridListModule,
    MatRadioModule,
    MatTableModule,
    MatDividerModule,
    MatTabsModule,
    MatChipsModule,
    MatBadgeModule,
    MatCardModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    FormsModule,
    HttpClientModule,
    
    StoreModule.forRoot(reducers,{}),
    ReactiveFormsModule,
    EffectsModule.forRoot([AuthEffects, UserEffects, QuestionEffects]),
    RouterModule.forRoot([
      { path: 'home/:questionId',canActivate: [authGuard], component: QuestionCardComponent },
      { path: 'add-question',canActivate: [authGuard], component: AddQuestionComponent },
      { path: 'leaderboard',canActivate: [authGuard], component: LeaderboardComponent },
      { path: 'log-in', component: LogInComponent },
      { path: 'home',canActivate: [authGuard], component: homeComponent},
      { path: '**', redirectTo: 'log-in' }
    ]),
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    homeComponent,
    LogInComponent,
    QuestionCardComponent,
    AddQuestionComponent,
    LeaderboardComponent
  ],
  providers: [AuthService, UserService, QuestionService, CdkColumnDef],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }