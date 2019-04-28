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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    CoursesIndexComponent,
    CourseShowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule
  ],
  providers: [
    UserService,
    SessionService,
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
