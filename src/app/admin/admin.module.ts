import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { IconsModule } from '../icons/icons.module';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../auth/auth.guard';
import { AdminGuard } from '../auth/admin.guard';
import { AdminAppComponent } from '../admin-app/admin-app.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminStudentsComponent } from './admin-students/admin-students.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminCoursesComponent } from '../admin-courses/admin-courses.component';
import { MessagesComponent } from '../messages/messages.component';
import { CreateMessageComponent } from '../create-message/create-message.component';
import { AdminClustersComponent } from './admin-clusters/admin-clusters.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminAppComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      {
        path: 'alumnos',
        component: AdminStudentsComponent,
        canActivateChild: [AuthGuard, AdminGuard],
      },
      {
        path: 'clusters',
        component: AdminClustersComponent,
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
        path: 'cursos/:id',
        component: AdminCoursesComponent,
        canActivateChild: [AuthGuard, AdminGuard],
      },
      {
        path: 'mensajes',
        component: MessagesComponent,
        canActivate: [AuthGuard, AdminGuard],
      },
      {
        path: 'mensajes/enviar',
        component: CreateMessageComponent,
        canActivate: [AuthGuard, AdminGuard],
      },
      {
        path: 'student-profile/:id',
        loadChildren:
          '../student-profile/student-profile.module#StudentProfileModule',
        canActivate: [AuthGuard],
      },
      {
        path: '',
        component: AdminHomeComponent,
        canActivateChild: [AuthGuard, AdminGuard],
      },
    ],
  },
];

@NgModule({
  entryComponents: [],
  declarations: [
    AdminAppComponent,
    AdminHomeComponent,
    AdminStudentsComponent,
    AdminProfileComponent,
    AdminCoursesComponent,
    MessagesComponent,
    CreateMessageComponent,
    AdminClustersComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IconsModule,
    SharedModule,
    NgSelectModule,
    RouterModule.forChild(adminRoutes),
    ScrollingModule,
  ],
  exports: [
    AdminAppComponent,
    AdminHomeComponent,
    AdminStudentsComponent,
    AdminProfileComponent,
    AdminCoursesComponent,
    MessagesComponent,
    CreateMessageComponent,
    AdminClustersComponent,
  ],
})
export class AdminModule {}
