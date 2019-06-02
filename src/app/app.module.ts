import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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


export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  // tslint:disable-next-line:only-arrow-functions
  return function(state, action) {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [debug];

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
    StudentProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    StoreModule.forRoot(appReducers, {metaReducers})
  ],
  providers: [
    UserService,
    SessionService,
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
