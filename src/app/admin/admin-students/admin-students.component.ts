import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { AppState } from '../../store/state/app.state';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../store/selectors/user.selectors';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-students',
  templateUrl: './admin-students.component.html',
  styleUrls: ['./admin-students.component.css']
})
export class AdminStudentsComponent implements OnInit {
  collapsedSideBar = true;
  public students: any[];
  currentUser$: Observable<User>;
  constructor(
    public store: Store<AppState>,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getAllStudents().subscribe(res => {
      this.students = res;
    });
  }

  toggleSideBar() {
    this.collapsedSideBar = !this.collapsedSideBar;
  }
}
