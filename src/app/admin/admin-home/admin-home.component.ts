import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  course = {
    title: 'Introducción a la diabetes',
    lessons: [
      {
        description: '1. ¿Qué es la diabetes?',
        progress: 79
      },
      {
        description: '2. Recomendaciones ada',
        progress: 0
      }
    ]
  };
  constructor() { }

  ngOnInit() {
  }

}
