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
import { MessagesComponent } from './messages/messages.component';
import { CreateMessageComponent } from './create-message/create-message.component';
import { NotAdminGuard } from './auth/not-admin.guard';
import { AdminAppComponent } from './admin-app/admin-app.component';
import { AdminGuard } from './auth/admin.guard';
import { AdminLinkComponent } from './admin-link/admin-link.component';

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
  // {
  //   path: 'admin-login',
  //   component: AdminLoginComponent,
  //   canActivate: [AuthGuard],
  // },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [NotauthGuard],
  },
  {
    path: 'admin',
    component: AdminAppComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      {
        path: 'alumnos',
        component: AdminStudentsComponent,
        canActivateChild: [AuthGuard, AdminGuard],
      },
      {
        path: 'perfil',
        component: AdminProfileComponent,
        canActivateChild: [AuthGuard, AdminGuard],
      },
      {
        path: 'cursos',
        component: AdminCoursesComponent,
        canActivateChild: [AuthGuard, AdminGuard],
      },
      {
        path: 'mensajes',
        component: MessagesComponent,
        canActivate: [AuthGuard, AdminGuard],
      },
      {
        path: 'link',
        component: AdminLinkComponent,
        canActivate: [AuthGuard, AdminGuard],
      },
      {
        path: 'mensajes/enviar',
        component: CreateMessageComponent,
        canActivate: [AuthGuard, AdminGuard],
      },
      {
        path: '',
        component: AdminHomeComponent,
        canActivateChild: [AuthGuard, AdminGuard],
      },
    ],
  },
  {
    path: 'inicio',
    component: StudentAppComponent,
    canActivate: [AuthGuard, NotAdminGuard],
    children: [
      {
        path: 'cursos',
        component: CoursesIndexComponent,
        canActivateChild: [AuthGuard, NotAdminGuard],
      },
      {
        path: 'cursos/:id',
        component: CourseIntroComponent,
        canActivateChild: [AuthGuard, NotAdminGuard],
        children: [
          {
            path: ':element_index',
            component: CourseShowComponent,
            canActivateChild: [AuthGuard, NotAdminGuard],
          },
        ],
      },
      {
        path: 'perfil',
        component: StudentProfileComponent,
        canActivate: [AuthGuard, NotAdminGuard],
      },
      {
        path: '',
        component: StudentHomeComponent,
        canActivateChild: [AuthGuard, NotAdminGuard],
      },
    ],
  },
  {
    path: 'student-profile/:id',
    component: StudentProfileComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
