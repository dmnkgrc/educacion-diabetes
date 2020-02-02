import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotauthGuard } from '../auth/notauth.guard';
import { RecoverPasswordComponent } from './recover-password.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';

const recoverPasswordRoutes: Routes = [
  {
    path: '',
    component: RecoverPasswordComponent,
    canActivate: [NotauthGuard],
  },
  {
    path: ':token',
    component: ResetPasswordComponent,
    canActivate: [NotauthGuard],
  },
];

@NgModule({
  declarations: [RecoverPasswordComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(recoverPasswordRoutes),
  ],
  exports: [RecoverPasswordComponent, ResetPasswordComponent],
})
export class RecoverPasswordModule {}
