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

  public user: any;
  currentUser$: Observable<User>;
  collapsedSideBar = true;
  courses: any;
  actions: any;
  grades: any;
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
          this.grades = this.user.courses_grades;
          this.actions = this.user.actions;
          this.userService.getUserCourses(this.user.user_id).subscribe((courses: any) => {
            if (!courses.error) {
              this.courses = courses;
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
              this.userService.getUserGrades(this.user.user_id).subscribe((res: any) => {
                this.grades = res.courses_grades;
              });
              this.userService.getUserCourses(this.user.user_id).subscribe((courses: any) => {
                if (!courses.error) {
                  this.courses = courses;
                }
              });
              this.userService.getUserActions(this.user.user_id).subscribe((actions) => {
                this.actions = actions;
              });
            }
          );
      }
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
