import { Component, OnInit, HostListener } from '@angular/core';
import { CourseService } from '../services/course.service';
import { Observable } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserService } from '../services/user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.scss'],
})
export class AdminCoursesComponent implements OnInit {
  public showCourse = false;
  private editPresentationMode = false;
  public editCourseMode = false;
  private presentationId: number;
  private courseId: number;
  public title: string;
  public frame: string;
  public audioUrl: string;
  public audioSync: string;
  public position: string;
  public name: string;
  public description: string;
  public selectedCourse: any;
  public coursesId: number;
  public usersId: number[];
  public questions: any[] = [
    {
      title: '',
      choices: [''],
      correctAnswer: '',
    },
  ];
  public times: any;
  public courses$: Observable<any>;
  public currentSlide: any = 1;
  public frameUrl: SafeResourceUrl;
  public students$: Observable<any>;
  collapsedSideBar = true;

  constructor(
    private courseService: CourseService,
    private sanitizer: DomSanitizer,
    private userService: UserService
  ) {}
  @HostListener('window:message', ['$event'])
  onMessage(e) {
    if (e.origin.includes('localhost')) {
      return false;
    }
    const data = JSON.parse(e.data);
    if (data.eventName === 'slidechanged') {
      let newSlide = data.state.indexh + 1;
      if (data.state.indexv > 0) {
        newSlide = `${newSlide}.${data.state.indexv}`;
      }
      const player = document.getElementById('player') as HTMLAudioElement;
      this.currentSlide = newSlide;
      player.load();
    }
    return;
  }
  ngOnInit() {
    this.courses$ = this.courseService.getAllCourses();
    this.students$ = this.userService.getAllStudents();
  }

  public toggleCourse() {
    this.showCourse = !this.showCourse;
  }

  public getUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  public selectPresentation(presentation: any, event: any) {
    if (typeof event.target.className !== 'string') {
      return;
    }
    this.selectedCourse = presentation;
    this.frameUrl = this.getUrl(presentation.frame);
    let audioSync = presentation.audio_sync;
    if (audioSync) {
      audioSync = `{${audioSync}}`;
      this.times = JSON.parse(audioSync);
    }
    this.toggleCourse();
  }

  public createPresentation() {
    if (this.frame && this.coursesId) {
      const data = {
        title: this.title,
        frame: this.frame,
        coursesId: [this.coursesId],
        audioUrl: this.audioUrl,
        audioSync: this.audioSync,
        position: this.position,
      };
      if (this.editPresentationMode) {
        this.editPresentationMode = false;
        return this.courseService
          .editPresentation(data, this.presentationId)
          .subscribe(presentation => {
            this.courses$ = this.courseService.getAllCourses();
          });
      }
      return this.courseService
        .createPresentation(data)
        .subscribe(presentation => {
          this.courses$ = this.courseService.getAllCourses();
        });
    }
    alert('Frame y Cursos son requeridos');
  }

  public createActivity() {
    let validQuestions = false;
    if (this.questions) {
      validQuestions = this.questions.every(question => {
        return (
          question.title &&
          question.correctAnswer &&
          question.choices.length > 0
        );
      });
    }
    if (this.name && validQuestions && this.coursesId) {
      const data = {
        name: this.name,
        questions: this.questions,
        position: this.position,
        coursesId: [this.coursesId],
      };
      return this.courseService.createActivity(data).subscribe(() => {
        this.courses$ = this.courseService.getAllCourses();
      });
    }
    alert('Nombre y Preguntas son requeridos');
  }

  public addQuestion() {
    this.questions.push({
      title: '',
      choices: [''],
      correctAnswer: '',
    });
  }

  public removeQuestion() {
    this.questions.pop();
  }

  public addChoice(index: number) {
    this.questions[index].choices.push('');
  }

  public removeChoice(index: number) {
    this.questions[index].choices.pop();
  }

  public createCourse() {
    if (this.name && this.description) {
      const data = {
        name: this.name,
        description: this.description,
        users: this.usersId || [],
      };
      if (this.editCourseMode) {
        this.editCourseMode = false;
        return this.courseService
          .editCourse(data, this.courseId)
          .subscribe(() => {
            this.courses$ = this.courseService.getAllCourses();
          });
      }
      return this.courseService.createCourse(data).subscribe(() => {
        this.courses$ = this.courseService.getAllCourses();
      });
    }
    alert('Nombre y descripción son requeridos');
  }

  public editPresentation(event: any, presentation: any, id: number) {
    this.title = presentation.title;
    this.frame = presentation.frame;
    this.audioSync = presentation.audio_sync;
    this.audioUrl = presentation.audio_url;
    this.coursesId = id;
    this.position = presentation.position;
    this.editPresentationMode = true;
    this.presentationId = presentation.id;
  }

  public editCourse(event: any, course: any) {
    this.name = course.name;
    this.description = course.description;
    this.editCourseMode = true;
    this.courseId = course.id;
    this.usersId = course.users.map(user => user.id);
  }

  public deletePresentation(event: any, id: number) {
    event.stopPropagation();
    if (confirm('¿Estás seguro?')) {
      return this.courseService.deletePresentation(id).subscribe(() => {
        this.courses$ = this.courseService.getAllCourses();
      });
    }
  }

  public deleteCourse(event: any, id: number) {
    event.stopPropagation();
    if (confirm('¿Estás seguro?')) {
      return this.courseService.deleteCourse(id).subscribe(() => {
        this.courses$ = this.courseService.getAllCourses();
      });
    }
  }

  toggleSideBar() {
    this.collapsedSideBar = !this.collapsedSideBar;
  }
}
