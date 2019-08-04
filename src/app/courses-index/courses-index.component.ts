import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-courses-index',
  templateUrl: './courses-index.component.html',
  styleUrls: ['./courses-index.component.css']
})
export class CoursesIndexComponent implements OnInit {
  courses: any;
  collapsedSideBar = true;
  constructor(
    public courseService: CourseService
  ) {}

  ngOnInit() {
    this.courseService.getAllCourses().subscribe(res => {
      this.courses = res;
    });
  }

  toggleSideBar() {
    this.collapsedSideBar = !this.collapsedSideBar;
  }
}
