import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { AppState } from '../../store/state/app.state';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../store/selectors/user.selectors';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-admin-students',
  templateUrl: './admin-students.component.html',
  styleUrls: ['./admin-students.component.css']
})
export class AdminStudentsComponent {

  public students = [
      {
          name: 'Juan Valdez',
          cluster: 'Axxa',
          professional_license: '234BHUREDSAJIO342',
          city: 'CDMX',
          speciality: 'Neurologo'
      },
      {
        name: 'Juan Valdez',
        cluster: 'Axxa',
        professional_license: '234BHUREDSAJIO342',
        city: 'CDMX',
        speciality: 'Neurologo'
    }, {
        name: 'Juan Valdez',
        cluster: 'Axxa',
        professional_license: '234BHUREDSAJIO342',
        city: 'CDMX',
        speciality: 'Neurologo'
    }, {
        name: 'Juan Valdez',
        cluster: 'Axxa',
        professional_license: '234BHUREDSAJIO342',
        city: 'CDMX',
        speciality: 'Neurologo'
    }, {
        name: 'Juan Valdez',
        cluster: 'Axxa',
        professional_license: '234BHUREDSAJIO342',
        city: 'CDMX',
        speciality: 'Neurologo'
    }, {
        name: 'Juan Valdez',
        cluster: 'Axxa',
        professional_license: '234BHUREDSAJIO342',
        city: 'CDMX',
        speciality: 'Neurologo'
    }
  ];
  currentUser$: Observable<User>;
  constructor(
    public store: Store<AppState>
  ) { }
}
