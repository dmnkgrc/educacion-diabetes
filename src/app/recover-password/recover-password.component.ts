import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { SetCurrentUser } from '../store/actions/user.actions';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss'],
})
export class RecoverPasswordComponent implements OnInit {
  email: string;
  submitted = false;
  success = false;
  recoverPasswordForm: FormGroup;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.recoverPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  get f() {
    return this.recoverPasswordForm.controls;
  }

  sendRecoverPassword() {
    this.submitted = true;
    if (this.recoverPasswordForm.invalid) {
      return;
    }
    this.userService
      .recoverPassword(this.recoverPasswordForm.controls.email.value)
      .subscribe(result => {
        this.success = true;
      });
  }
}
