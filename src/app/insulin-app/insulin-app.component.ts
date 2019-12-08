import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insulin-app',
  templateUrl: './insulin-app.component.html',
  styleUrls: ['./insulin-app.component.scss'],
})
export class InsulinAppComponent implements OnInit {
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
