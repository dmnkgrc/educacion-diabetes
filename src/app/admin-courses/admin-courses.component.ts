import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { Observable } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
  public selectedCourse: any;
  public coursesId: number[];
  public courses$: Observable<any>;

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.courses$ = this.courseService.getAllCourses();
  }

  public toggleCourse() {
    this.showCourse = !this.showCourse;
  }

  public selectCourse(course: any) {
    this.selectedCourse = course;
    this.toggleCourse();
  }

  public createPresentation() {
    if (this.frame && this.coursesId.length > 0) {
      return this.courseService.createPresentation({
        frame: this.frame,
        coursesId: this.coursesId,
        audioUrl: this.audioUrl,
        audioSync: this.audioSync
      }).subscribe(presentation => {
        this.courses$ = this.courseService.getAllCourses();
      });
    }
    alert('Frame y Cursos son requeridos');
  }

}
