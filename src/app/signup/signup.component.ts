import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass'],
})
export class SignupComponent implements OnInit {
  name: string;
  lastName: string;
  specialty: string;
  city: string;
  state: string;
  address: string;
  telephone: number;
  cellphone: number;
  email: string;
  password: string;
  professionalC: string;
  acceptance: boolean;
  signupForm: FormGroup;
  submitted = false;
  error: any;
  constructor(
    public userService: UserService,
    private formBuilder: FormBuilder,
    public sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      specialty: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      professionalC: ['', Validators.required],
    });
  }

  get f() {
    return this.signupForm.controls;
  }

  register() {
    this.error = null;
    this.submitted = true;
    console.log(this.signupForm.invalid, this.signupForm.controls);
    if (this.signupForm.invalid) {
      return;
    }
    const data = {
      user: {
        // tslint:disable:no-string-literal
        first_name: this.signupForm.controls['name'].value,
        last_name: this.signupForm.controls['lastName'].value,
        email: this.signupForm.controls['email'].value,
        password: this.signupForm.controls['password'].value,
        city: this.signupForm.controls['city'].value,
        speciality: this.signupForm.controls['specialty'].value,
        professional_license: this.signupForm.controls['professionalC'].value,
        admin: false,
      },
    };
    this.userService.signup(data).subscribe(res => {
      if (!res.error) {
        this.sessionService.setCurrentUser(res);
        this.router.navigateByUrl('/');
        return;
      }

      this.error = res.error;
    });
  }
}
