import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../services/user.service';
import { resolve } from 'path';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  password: string;
  confirm: string;
  submitted = false;
  success = false;
  token: string;
  errors: string[];
  resetPasswordForm: FormGroup;
  constructor(
    public userService: UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirm: ['', Validators.required],
    });
    this.token = this.route.snapshot.paramMap.get('token');
  }
  get f() {
    return this.resetPasswordForm.controls;
  }

  resetPassword() {
    this.submitted = true;
    this.errors = null;
    this.success = false;
    if (this.resetPasswordForm.invalid) {
      return;
    }
    this.userService
      .resetPassword(
        this.resetPasswordForm.controls.password.value,
        this.resetPasswordForm.controls.confirm.value,
        this.token
      )
      .subscribe(
        result => {
          this.success = true;
        },
        ({ error }) => {
          if (error.error) {
            this.errors = ['Este token ya ha sido usado'];
            return;
          }
          this.errors = error.errors;
        }
      );
  }
}
