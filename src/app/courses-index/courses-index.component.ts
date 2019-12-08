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
      const courses = res.filter(course => {
        if (
          !course.clusters ||
          course.clusters.length === 0 ||
          course.clusters.length > 1
        ) {
          return true;
        }
        const cluster = course.clusters.find(cl => cl.id === 3);
        return !cluster;
      });
      courses.forEach(course => {
        this.courseService.getCourseProgress(course.id).subscribe(result => {
          this.progress[course.id] = result.progress;
        });
      });
      this.courses = courses;
    });
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
