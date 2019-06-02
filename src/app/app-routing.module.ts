import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.compontent';
import { SignupComponent } from './signup/signup.component';
import { CoursesIndexComponent } from './courses-index/courses-index.component';
import { CourseShowComponent } from './course-show/course-show.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminStudentsComponent } from './admin/admin-students/admin-students.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';

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
    path: 'admin-login',
    component: AdminLoginComponent
  },
  {
    path: 'admin-home',
    component: AdminHomeComponent
  },
  {
    path: 'admin-students',
    component: AdminStudentsComponent
  },
  {
    path: 'admin-profile',
    component: AdminProfileComponent
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
  },
  {
    path: 'student-home',
    component: StudentHomeComponent
  },
  {
    path: 'student-profile',
    component: StudentProfileComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
