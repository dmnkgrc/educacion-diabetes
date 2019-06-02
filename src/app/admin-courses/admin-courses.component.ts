import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.scss']
})
export class AdminCoursesComponent implements OnInit {
  public showCourse = false;
  constructor() { }

  ngOnInit() {
  }

  public toggleCourse() {
    this.showCourse = !this.showCourse;
  }

}
