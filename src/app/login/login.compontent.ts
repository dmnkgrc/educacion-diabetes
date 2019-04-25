import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(
    public sessionService: SessionService
  ) { }

  ngOnInit() {
  }

  login() {
    console.log(this.email, this.password);
    this.sessionService.authenticate(this.email, this.password).subscribe(result => {
      console.log(result);
    });
  }
}
