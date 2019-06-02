import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { AppState } from '../../store/state/app.state';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../store/selectors/user.selectors';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  public last_activities: any = [
    {
      time: 'Hoy 1:00',
      description: 'Edición del curso "Introducción a la diabetes"'
    },
    {
      time: 'Ayer 4:00',
      description: 'Edición del curso "Introducción a la diabetes"'
    },
    {
      time: 'Hace 2 días 7:00',
      description: 'Edición del curso "Introducción a la diabetes"'
    },
    {
      time: 'Hace 3 días 9:00',
      description: 'Edición del curso "Introducción a la diabetes"'
    },
  ];
  currentUser$: Observable<User>;
  constructor(
    public store: Store<AppState>
  ) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    const user = jwtDecode(token);
    this.currentUser$ = this.store.select(selectCurrentUser);
  }

}
