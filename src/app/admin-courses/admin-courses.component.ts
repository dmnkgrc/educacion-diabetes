import { Component, OnInit, HostListener } from '@angular/core';
import { CourseService } from '../services/course.service';
import { Observable } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.scss']
})
export class AdminCoursesComponent implements OnInit {
  public showCourse = false;
  public frame: string;
  public audioUrl: string;
  public audioSync: string;
  public selectedCourse: any;
  public coursesId: number[];
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
      console.log(newSlide)
      this.currentSlide = newSlide;
      player.load();
    }
    console.log(data);
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

  public selectCourse(course: any) {
    this.selectedCourse = course;
    if (course.presentations.length > 0) {
      this.frameUrl = this.getUrl(course.presentations[0].frame);
      let audioSync = course.presentations[0].audio_sync;
      if (audioSync) {
        audioSync = `{${audioSync}}`;
        this.times = JSON.parse(audioSync);
      }
    }
    this.toggleCourse();
  }

  public createPresentation() {
    if (this.frame && this.coursesId.length > 0) {
      return this.courseService.createPresentation({
        frame: this.frame,
        coursesId: this.coursesId,
        audioUrl: this.audioUrl,
        audioSync: this.audioSync
      }).subscribe(presentation => {
        this.courses$ = this.courseService.getAllCourses();
      });
    }
    alert('Frame y Cursos son requeridos');
  }

}
