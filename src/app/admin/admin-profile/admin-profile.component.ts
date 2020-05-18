import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { AppState } from '../../store/state/app.state';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../store/selectors/user.selectors';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { tap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css'],
})
export class AdminProfileComponent implements OnInit {
  collapsedSideBar = true;
  public lastActivities: any = [
    {
      time: 'Hoy 1:00',
      description: 'Edición del curso "Introducción a la diabetes"',
    },
    {
      time: 'Ayer 4:00',
      description: 'Edición del curso "Introducción a la diabetes"',
    },
    {
      time: 'Hace 2 días 7:00',
      description: 'Edición del curso "Introducción a la diabetes"',
    },
    {
      time: 'Hace 3 días 9:00',
      description: 'Edición del curso "Introducción a la diabetes"',
    },
  ];
  currentUser$: Observable<User>;
  actions: any;
  constructor(public store: Store<AppState>, public userService: UserService) {}

  ngOnInit() {
    this.currentUser$ = this.store.select(selectCurrentUser);
    this.currentUser$.subscribe(user => {
      if (!user.user_id) {
        return;
      }
      this.userService.getUserActions(user.user_id).subscribe(res => {
        this.actions = res.reverse();
      });
    });
  }

  getInitials(currentUser: User) {
    if (!currentUser) {
      return '';
    }
    let initials = '';
    initials = currentUser.first_name[0] + currentUser.last_name[0];
    return initials;
  }

  toggleSideBar() {
    this.collapsedSideBar = !this.collapsedSideBar;
  }
}
