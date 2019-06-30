import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.scss']
})
export class AdminCoursesComponent implements OnInit {
  public showCourse = false;
  public frame: string;
  public audioUrl: string;
  public audioSync: string;
  public coursesId: number[];
  public courses$: Observable<any>;

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.courses$ = this.courseService.getAllCourses();
  }

  public toggleCourse() {
    this.showCourse = !this.showCourse;
  }

}
