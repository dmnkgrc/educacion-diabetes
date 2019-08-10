import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.scss'],
})
export class StudentHomeComponent {
  collapsedSideBar = true;
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
  constructor() {}

  toggleSideBar() {
    this.collapsedSideBar = !this.collapsedSideBar;
  }
}
