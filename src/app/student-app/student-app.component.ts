import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-app',
  templateUrl: './student-app.component.html',
  styleUrls: ['./student-app.component.sass'],
})
export class StudentAppComponent implements OnInit {
  collapsedSideBar = false;
  constructor(private router: Router) {}

  ngOnInit() {}

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  toggleSideBar() {
    this.collapsedSideBar = !this.collapsedSideBar;
  }
}
