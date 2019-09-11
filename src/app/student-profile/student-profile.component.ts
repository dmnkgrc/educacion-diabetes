import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { AppState } from '../store/state/app.state';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../store/selectors/user.selectors';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { map, tap } from 'rxjs/operators';

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
    public router: Router,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.currentUser$ = this.store.select(selectCurrentUser);
      if (params.id) {
        this.userService.getUserById(params.id).subscribe((user: User) => {
          this.user = user;
          this.userService.getUserCourses(this.user.id).subscribe((courses: any) => {
            if (!courses.error) {
              this.user.courses = courses;
            }
          });
        });
      } else {
        const token = localStorage.getItem('token');
        const user = jwtDecode(token);
        // tslint:disable-next-line: no-shadowed-variable
        this.currentUser$.subscribe(
            // tslint:disable-next-line: no-shadowed-variable
            (user: User) => {
              this.user = user;
              this.userService.getUserCourses(this.user.user_id).subscribe((courses: any) => {
                if (!courses.error) {
                  this.user.courses = courses;
                }
              });
            }
          );
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

  updateUser() {
    this.userService.updateUser(this.user).subscribe(res => console.log(res));
  }

  deleteUser() {
    this.userService.deleteUserById(this.user.id)
    .subscribe(() => {
      this.router.navigateByUrl('/admin/alumnos');
    });
  }

  sendMessage() {
    this.router.navigateByUrl('admin/mensajes/enviar');
  }
}
