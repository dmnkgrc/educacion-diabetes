import { Component, OnInit, Input } from '@angular/core';
import { CourseService } from '../services/course.service';
import { mergeMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-courses-index',
  templateUrl: './courses-index.component.html',
  styleUrls: ['./courses-index.component.css'],
})
export class CoursesIndexComponent implements OnInit {
  courses: any;
  progress: { [key: string]: any } = {};
  collapsedSideBar = true;

  @Input() activo: boolean;
  constructor(public courseService: CourseService) {}

  ngOnInit() {
    this.courseService.getAllCourses().subscribe(res => {
      res.forEach(course => {
        this.courseService.getCourseProgress(course.id).subscribe(result => {
          this.progress[course.id] = result.progress;
        });
      });
      this.courses = res;
    });
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
