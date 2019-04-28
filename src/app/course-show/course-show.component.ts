import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-show',
  templateUrl: './course-show.component.html',
  styleUrls: ['./course-show.component.css']
})
export class CourseShowComponent implements OnInit {
  select = 'first'
  constructor(
  ) { }

  ngOnInit() {
  }

  // tslint:disable-next-line:align
  changeSelect(select): void {
      this.select = select;
  }

}
