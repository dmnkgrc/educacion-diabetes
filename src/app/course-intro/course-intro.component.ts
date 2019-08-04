import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-intro',
  templateUrl: './course-intro.component.html',
  styleUrls: ['./course-intro.component.scss']
})
export class CourseIntroComponent implements OnInit {
  course: any;
  collapsedSideBar = true;

  constructor(private courseService: CourseService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.courseService.getCourseById(params.id).subscribe(res => {
        this.course = res;
      });
    });
  }

  toggleSideBar() {
    this.collapsedSideBar = !this.collapsedSideBar;
  }

}
