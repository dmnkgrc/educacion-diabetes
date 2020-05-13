import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { localStorageSync } from 'ngrx-store-localstorage';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.compontent';
import { SessionService } from './services/session.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { UserService } from './services/user.service';
import { CoursesIndexComponent } from './courses-index/courses-index.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { CourseShowComponent } from './course-show/course-show.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { StoreModule, MetaReducer, ActionReducer } from '@ngrx/store';
import { appReducers } from './store/reducers/app.reducers';
import { CourseIntroComponent } from './course-intro/course-intro.component';
import { IconsModule } from './icons/icons.module';
import { StudentAppComponent } from './student-app/student-app.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { GoogleAnalyticsService } from './google-analytics.service';
import { LegalComponent } from './legal/legal.component';
import { CookiesComponent } from './cookies/cookies.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from './shared/shared.module';

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  // tslint:disable-next-line:only-arrow-functions
  return function(state, action) {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ['users'], rehydrate: true })(reducer);
}

export const metaReducers: MetaReducer<any>[] = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    CoursesIndexComponent,
    CourseShowComponent,
    StudentHomeComponent,
    CourseIntroComponent,
    StudentAppComponent,
    PrivacyComponent,
    LegalComponent,
    CookiesComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    IconsModule,
    StoreModule.forRoot(appReducers, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    SharedModule,
  ],
  providers: [UserService, SessionService, HttpClient, GoogleAnalyticsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
