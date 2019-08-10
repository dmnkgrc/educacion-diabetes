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
import { AdminCoursesComponent } from './admin-courses/admin-courses.component';
import { CourseIntroComponent } from './course-intro/course-intro.component';
import { NotauthGuard } from './auth/notauth.guard';
import { AuthGuard } from './auth/auth.guard';
import { StudentAppComponent } from './student-app/student-app.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    canActivate: [NotauthGuard],
  },

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotauthGuard],
  },
  {
    path: 'admin-login',
    component: AdminLoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin-home',
    component: AdminHomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin-students',
    component: AdminStudentsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin-profile',
    component: AdminProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin-courses',
    component: AdminCoursesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [NotauthGuard],
  },
  {
    path: 'inicio',
    component: StudentAppComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'cursos',
        component: CoursesIndexComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'cursos/:id/:presentation_id',
        component: CourseShowComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'intro/:id',
        component: CourseIntroComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'perfil',
        component: StudentProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: '',
        component: StudentHomeComponent,
        canActivateChild: [AuthGuard]
      }
    ]
  },
  {
    path: 'student-profile/:id',
    component: StudentProfileComponent,
    canActivate: [AuthGuard],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
