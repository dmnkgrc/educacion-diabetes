import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses-index',
  templateUrl: './courses-index.component.html',
  styleUrls: ['./courses-index.component.css']
})
export class CoursesIndexComponent implements OnInit {

  courses = [
    {
      title: 'El Impacto de la Diabetes',
      content: 'En este capitulo resumiremos distintos tipos de diabetes y sus aspectos demográficos,así como un vistazo a la fisiopatogenia.',
      show: true,
      img: '/assets/guiadiabetes.jpg',
      doc: '/assets/guia-diabetes.pdf',
      progress: 75
    },
    {
      title: 'Diagnóstico',
      content: 'Conociendo ya los diferentes tipos de diabetes, podrás  discernir cuando recibas un paciente de nuevo.',
      show: true,
      img: '/assets/Diagnostico.png',
      doc: 'assets/Diagnostico y Objetivos Terapéuticos.pdf',
      progress: 25
    },
    {
      title: 'Recomendaciones ADA',
      content: 'Te presentamos unos tips por parte de la American Diabetes Association',
      show: true,
      img: '/assets/recomendacionesada.png',
      doc: '/assets/RecomendacionesADA.pdf',
      progress: 25
    },
    {
      title: 'Control Glucémico',
      content: 'Vamos a revisar cómo se realiza un control glucémico',
      show: true,
      img: '/assets/controlglucemico.png',
      doc: '/assets/Control Glucémico.pdf',
      progress: 25
    },
    {
      title: 'La HBA',
      content: 'Conoceremos las limitaciones de la HbA1c',
      show: true,
      img: 'assets/lahba.png',
      doc: '/assets/hba.pdf',
      progress: 25
    },
    {
      title: 'Automonitoreo',
      content: 'El automoniroeo de la glucosa es un componente integral efectivo para la terapia.',
      show: false,
      img: '/assets/Automonitoreo.png',
      doc: '/assets/Automonitoreo.pdf',
      progress: 25
    },
    {
      title: 'Beneficios',
      content: 'Una lista de todos los beneficios de la AMG',
      show: false,
      img: '/assets/BeneficiosThumbnail.png',
      doc: '/assets/AMG.pdf',
      progress: 25
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}
