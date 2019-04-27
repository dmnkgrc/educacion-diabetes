import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
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
  acceptance: true;
  constructor(
    public userService: UserService
  ) { }

  ngOnInit() {
  }

  register() {
    let data = {
      user: {
        first_name: this.name ,
        last_name: this.lastName,
        email: this.email,
        password: this.password ,
        city: this.city ,
        address: this.address ,
        phone: this.telephone ,
        cellphone: this.cellphone ,
        speciality: this.specialty ,
        professional_license: this.professionalC
        }
    };
    this.userService.signup(data).subscribe((res) => {console.log(res); });
  }
}
