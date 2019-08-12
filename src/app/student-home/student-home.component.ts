import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.scss'],
})
export class StudentHomeComponent {
  collapsedSideBar = true;
  courses$: Observable<any[]>;
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
    this.courses$ = courseService.getAllCourses();
  }

  toggleSideBar() {
    this.collapsedSideBar = !this.collapsedSideBar;
  }
}
