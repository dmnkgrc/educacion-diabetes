import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-link',
  templateUrl: './admin-link.component.html',
  styleUrls: ['./admin-link.component.scss'],
})
export class AdminLinkComponent implements OnInit {
  activo = true; // Cambiar a variable por parametro de base de datos
  message;

  constructor() {}

  ngOnInit() {}
  // Sin relevancia, solo es para que sea legible para el usuario
  mensaje(): string {
    if (this.activo === true) {
      this.message = 'Activo';
    } else {
      this.message = 'Inactivo';
    }
    return this.message;
  }
}
