import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { mergeMap, tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-course-intro',
  templateUrl: './course-intro.component.html',
  styleUrls: ['./course-intro.component.scss'],
})
export class CourseIntroComponent implements OnInit {
  course$: Observable<any>;
  collapsedSideBar = true;
  currentIndex$: Observable<number>;
  routeRoot = 'inicio';

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {
    if (window.location.href.includes('insulina')) {
      this.routeRoot = 'insulina';
    }
  }

  ngOnInit() {
    this.currentIndex$ = this.route.firstChild.params.pipe(
      map(params => {
        return Number(params.element_index);
      })
    );
    this.course$ = this.route.params.pipe(
      mergeMap(params => this.courseService.getCourseById(params.id))
    );
  }

  toggleSideBar() {
    this.collapsedSideBar = !this.collapsedSideBar;
  }
}
