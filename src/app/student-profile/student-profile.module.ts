import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../auth/auth.guard';
import { StudentProfileComponent } from './student-profile.component';

const studentProfileRoutes: Routes = [
  {
    path: '',
    component: StudentProfileComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [StudentProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(studentProfileRoutes),
  ],
  exports: [StudentProfileComponent],
})
export class StudentProfileModule {}
