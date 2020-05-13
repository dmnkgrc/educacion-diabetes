import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.compontent';
import { SignupComponent } from './signup/signup.component';
import { CoursesIndexComponent } from './courses-index/courses-index.component';
import { CourseShowComponent } from './course-show/course-show.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { CourseIntroComponent } from './course-intro/course-intro.component';
import { NotauthGuard } from './auth/notauth.guard';
import { AuthGuard } from './auth/auth.guard';
import { StudentAppComponent } from './student-app/student-app.component';
import { NotAdminGuard } from './auth/not-admin.guard';
import { AdminGuard } from './auth/admin.guard';
import { PrivacyComponent } from './privacy/privacy.component';
import { LegalComponent } from './legal/legal.component';
import { CookiesComponent } from './cookies/cookies.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    canActivate: [NotauthGuard],
  },
  {
    path: 'recover-password',
    loadChildren:
      './recover-password/recover-password.module#RecoverPasswordModule',
    canActivate: [NotauthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotauthGuard],
  },
  {
    path: 'privacidad',
    component: PrivacyComponent,
  },
  {
    path: 'legal',
    component: LegalComponent,
  },
  {
    path: 'cookies',
    component: CookiesComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [NotauthGuard],
  },
  {
    path: 'admin',
    canActivate: [AuthGuard, AdminGuard],
    loadChildren: './admin/admin.module#AdminModule',
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
        loadChildren:
          './student-profile/student-profile.module#StudentProfileModule',
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
    loadChildren:
      './student-profile/student-profile.module#StudentProfileModule',
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
