import { Component, OnInit, HostListener } from '@angular/core';
import { CourseService } from '../services/course.service';
import { Observable } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { $ } from 'protractor';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.scss']
})
export class AdminCoursesComponent implements OnInit {
  public showCourse = false;
  private editPresentationMode = false;
  private presentationId: number;
  public title: string;
  public frame: string;
  public audioUrl: string;
  public audioSync: string;
  public position: string;
  public name: string;
  public description: string;
  public selectedCourse: any;
  public coursesId: number;
  public times: any;
  public courses$: Observable<any>;
  public currentSlide: any = 1;
  public frameUrl: SafeResourceUrl;

  constructor(private courseService: CourseService, private sanitizer: DomSanitizer) {}

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
  }

  public toggleCourse() {
    this.showCourse = !this.showCourse;
  }

  public getUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  public selectPresentation(presentation: any, event: any) {
    if (typeof(event.target.className) !== "string") {
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
        position: this.position
      };
      if (this.editPresentationMode) {
        this.editPresentationMode = false;
        return this.courseService.editPresentation(data, this.presentationId).subscribe(presentation => {
          this.courses$ = this.courseService.getAllCourses();
        });
      }
      return this.courseService.createPresentation(data).subscribe(presentation => {
        this.courses$ = this.courseService.getAllCourses();
      });
    }
    alert('Frame y Cursos son requeridos');
  }

  public createCourse() {
    if (this.name && this.description) {
      return this.courseService.createCourse({
        name: this.name,
        description: this.description
      }).subscribe(() => {
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

  public deletePresentation(event: any, id: number) {
    event.stopPropagation();
    if (confirm('¿Estás seguro?')) {
      return this.courseService.deletePresentation(id).subscribe(() => {
        this.courses$ = this.courseService.getAllCourses();
      });
    }
  }

}
