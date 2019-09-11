import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state/app.state';
import { SetCurrentUser } from '../store/actions/user.actions';
import { selectCurrentUser } from '../store/selectors/user.selectors';
import { tokenReference } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  submitted = false;
  loginForm: FormGroup;
  constructor(
    public sessionService: SessionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<AppState>
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
      const tokenInfo = this.getDecodedAccessToken(result.token);
      console.log('info', tokenInfo);
      const currentUser: User = new User({
        user_id: tokenInfo.user_id,
        first_name: tokenInfo.first_name,
        last_name: tokenInfo.last_name,
        speciality: tokenInfo.speciality,
        city: tokenInfo.city,
        email: tokenInfo.email,
        address: tokenInfo.address,
        admin: tokenInfo.admin,
        phone: tokenInfo.phone,
        cellphone: tokenInfo.cellphone,
        professional_license: tokenInfo.professional_license,
        exp: tokenInfo.exp,
        actions: tokenInfo.actions
      });
      this.store.dispatch(new SetCurrentUser(currentUser));
      localStorage.setItem('token', result.token);
      if (currentUser.admin) {
        this.router.navigateByUrl('/admin');
        return;
      }
      this.router.navigateByUrl('/');
    });
  }

  getDecodedAccessToken(token: string): any {
    try {
        return jwt_decode(token);
    } catch (Error) {
        return null;
    }
  }
}
