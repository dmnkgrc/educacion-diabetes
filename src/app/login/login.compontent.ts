import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  submitted = false;
  loginForm: FormGroup;
  constructor(
    public sessionService: SessionService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  get f() { return this.loginForm.controls; }

  login() {
    this.submitted = true;
    console.log(this.loginForm.invalid, this.loginForm.controls);
    if (this.loginForm.invalid) {
      return;
    }
    // tslint:disable:no-string-literal
    this.sessionService.authenticate(this.loginForm.controls['email'].value, 
    this.loginForm.controls['password'].value).subscribe(result => {
      console.log(result);
      this.router.navigateByUrl('courses');
    });
  }
}
