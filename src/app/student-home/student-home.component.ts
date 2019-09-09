import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.scss'],
})
export class StudentHomeComponent {
  collapsedSideBar = true;
  courses$: Observable<any[]>;
  progress: { [key: string]: any } = {};
  course = {
    title: 'Introducción a la diabetes',
    lessons: [
      {
        description: '1. ¿Qué es la diabetes?',
        progress: 79,
      },
      {
        description: '2. Recomendaciones ada',
        progress: 0,
      },
    ],
  };
  constructor(private courseService: CourseService) {
    this.courses$ = courseService.getAllCourses().pipe(
      tap(res => {
        res.forEach(course => {
          this.courseService.getCourseProgress(course.id).subscribe(result => {
            this.progress[course.id] = result.progress;
          });
        });
      })
    );
  }

  getNext(course) {
    if (!this.progress[course.id]) {
      return 0;
    }
    return (course.elements.length * this.progress[course.id]) / 100;
  }

  toggleSideBar() {
    this.collapsedSideBar = !this.collapsedSideBar;
  }
}
