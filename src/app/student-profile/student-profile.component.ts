import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {

  user = {
    name: 'Juan',
    lastName: 'Osorio',
    birthdayMonth: 'Marzo',
    birthdayDay: '13',
    birthdayYear: '1970',
    username: 'JuanOso',
    country: 'Mexico',
    city: 'Guadalajara',
    email: 'josorio@gmail.com',
    experience: [
      {
        university: 'UNAM - 1980 / 1987',
        speciality: 'Endocrinología',
        description: `Comencé la carrera en medicina en 1981 con la gran intención de curar el mundo de la diabetes,
                      me especialicé en el estudio de la sangre para prevenir que esta horrible enfermedad se sigua
                      propagando por el mundo, y por ahora quiero aprender lo más que pueda sobre esto.`,
      }
    ]
  };
  constructor() { }

  ngOnInit() {
  }

}
