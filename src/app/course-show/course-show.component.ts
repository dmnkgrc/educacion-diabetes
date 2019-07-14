import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../services/course.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-course-show',
  templateUrl: './course-show.component.html',
  styleUrls: ['./course-show.component.css']
})
export class CourseShowComponent implements OnInit {
  select = 'first';
  course: any;
  presentationIndex: any;
  selectedCourse: any;
  frameUrl: SafeResourceUrl;
  times: any;
  currentSlide: any;
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private sanitizer: DomSanitizer
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
    this.route.params.subscribe(params => {
      this.presentationIndex = params.presentation_id;
      this.courseService.getCourseById(params.id).subscribe(res => {
        this.course = res;
        this.selectPresentation();
      });
    });
  }

  public getUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  public selectPresentation() {
    this.selectedCourse = this.course.presentations_list[this.presentationIndex];
    this.frameUrl = this.getUrl(this.selectedCourse.frame);
    let audioSync = this.selectedCourse.audio_sync;
    if (audioSync) {
      audioSync = `{${audioSync}}`;
      this.times = JSON.parse(audioSync);
    }
  }

  // tslint:disable-next-line:align
  changeSelect(select): void {
    this.select = select;
  }
}
