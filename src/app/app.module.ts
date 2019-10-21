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
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StoreModule, MetaReducer, ActionReducer } from '@ngrx/store';
import { appReducers } from './store/reducers/app.reducers';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminStudentsComponent } from './admin/admin-students/admin-students.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { AdminCoursesComponent } from './admin-courses/admin-courses.component';
import { EscapeHtmlPipe } from './escape-html.pipe';
import { FormatDatePipe } from './format-date.pipe';
import { CourseIntroComponent } from './course-intro/course-intro.component';
import { IconsModule } from './icons/icons.module';
import { StudentAppComponent } from './student-app/student-app.component';
import { MessagesComponent } from './messages/messages.component';
import { CreateMessageComponent } from './create-message/create-message.component';
import { AdminAppComponent } from './admin-app/admin-app.component';
import { AdminLinkComponent } from './admin-link/admin-link.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

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
    AdminLoginComponent,
    AdminStudentsComponent,
    AdminHomeComponent,
    AdminProfileComponent,
    LoginComponent,
    SignupComponent,
    CoursesIndexComponent,
    CourseShowComponent,
    StudentHomeComponent,
    StudentProfileComponent,
    AdminCoursesComponent,
    CourseIntroComponent,
    MessagesComponent,
    CreateMessageComponent,
    EscapeHtmlPipe,
    FormatDatePipe,
    StudentAppComponent,
    AdminAppComponent,
    AdminLinkComponent,
    PrivacyComponent,
    RecoverPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    NgSelectModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    IconsModule,
    StoreModule.forRoot(appReducers, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
  ],
  providers: [UserService, SessionService, HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
