import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.compontent';
import { SignupComponent } from './signup/signup.component';
import { CoursesIndexComponent } from './courses-index/courses-index.component';
import { CourseShowComponent } from './course-show/course-show.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'courses',
    component: CoursesIndexComponent
  },
  {
    path: 'course-show',
    component: CourseShowComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
