import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-insulin-home',
  templateUrl: './insulin-home.component.html',
  styleUrls: ['./insulin-home.component.scss'],
})
export class InsulinHomeComponent {
  collapsedSideBar = true;
  courses$: Observable<any[]>;
  progress: { [key: string]: any } = {};

  constructor(private courseService: CourseService) {
    this.courses$ = courseService.getAllCourses().pipe(
      map(courses => {
        return courses.filter(course => {
          if (!course.clusters || course.clusters.length === 0) {
            return false;
          }
          const cluster = course.clusters.find(cl => cl.id === 3);
          return !!cluster;
        });
      }),
      tap(res => {
        console.log(res);
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
    const newIndex = Math.round(
      (course.elements.length * this.progress[course.id]) / 100
    );
    if (newIndex >= course.elements.length) {
      return 0;
    }
    return newIndex;
  }

  toggleSideBar() {
    this.collapsedSideBar = !this.collapsedSideBar;
  }
}
