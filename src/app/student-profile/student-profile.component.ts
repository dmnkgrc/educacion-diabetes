import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { AppState } from '../store/state/app.state';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../store/selectors/user.selectors';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {

  public user: any = {
    name: 'Juan',
    lastName: 'Osorio',
    birthdayMonth: 'Marzo',
    birthdayDay: '13',
    birthdayYear: '1970',
    username: 'JuanOso',
    country: 'Mexico',
    city: 'Guadalajara',
    email: 'josorio@gmail.com',

  };
  currentUser$: Observable<User>;
  collapsedSideBar = true;
  constructor(
    public store: Store<AppState>,
    public route: ActivatedRoute,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.userService.getUserById(params.id).subscribe((user: User) => {
          this.user = user;
        });
      } else {
        const token = localStorage.getItem('token');
        const user = jwtDecode(token);
        this.currentUser$ = this.store.select(selectCurrentUser);
        // tslint:disable-next-line: no-shadowed-variable
        this.currentUser$.subscribe((user: User) => {
          this.user = user;
        });
      }
      this.user = {
        ...this.user,
        experience: [
          {
            university: 'UNAM - 1980 / 1987',
            speciality: 'Endocrinología',
            description: `Comencé la carrera en medicina en 1981 con la gran intención de curar el mundo de la diabetes,
                        me especialicé en el estudio de la sangre para prevenir que esta horrible enfermedad se sigua
                        propagando por el mundo, y por ahora quiero aprender lo más que pueda sobre esto.`,
          }
        ],
        birthdayMonth: 'Marzo',
        birthdayDay: '13',
        birthdayYear: '1970',
        username: 'JuanOso',
      };
    });
  }

  toggleSideBar() {
    this.collapsedSideBar = !this.collapsedSideBar;
  }
}
