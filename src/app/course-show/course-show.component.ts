import {
  Component,
  OnInit,
  HostListener,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../services/course.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { mergeMap, switchMap, map, tap, takeLast } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as Survey from 'survey-angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-course-show',
  templateUrl: './course-show.component.html',
  styleUrls: ['./course-show.component.css'],
})
export class CourseShowComponent implements OnInit, OnDestroy {
  select = 'first';
  course: any;
  presentationIndex: any;
  selectedCourse: any;
  frameUrl: SafeResourceUrl = null;
  times: any = null;
  currentSlide: any;
  collapsedSideBar = true;
  element$: Observable<any>;
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private sanitizer: DomSanitizer,
    private userService: UserService
  ) {}

  @HostListener('window:message', ['$event'])
  onMessage(e) {
    if (
      e.origin.includes('localhost') ||
      e.origin.includes('dialogodiabetescare.com')
    ) {
      return false;
    }
    const data = JSON.parse(e.data);
    if (data.eventName === 'slidechanged' || data.eventName === 'ready') {
      let newSlide = data.state.indexh + 1;
      if (data.state.indexv > 0) {
        newSlide = `${newSlide}.${data.state.indexv}`;
      }
      const player = document.getElementById('player') as HTMLAudioElement;
      this.currentSlide = newSlide;
      player.load();
      document.querySelector('iframe').contentWindow.postMessage(
        JSON.stringify({
          method: 'isLastSlide',
        }),
        '*'
      );
    } else if (
      data.eventName === 'callback' &&
      data.method === 'isLastSlide' &&
      data.result
    ) {
      this.route.params
        .pipe(
          switchMap(({ element_index }) =>
            this.route.parent.params.pipe(
              mergeMap(({ id }) =>
                this.courseService
                  .getCourseById(id)
                  .pipe(map(course => course.elements[element_index]))
              )
            )
          ),
          (takeLast(1),
          switchMap(element => {
            console.log(element);
            return this.userService.completeLesson('presentation', element.id);
          }))
        )
        .subscribe(res => {});
    }
    return;
  }

  ngOnInit() {
    this.element$ = this.route.params.pipe(
      switchMap(({ element_index }) =>
        this.route.parent.params.pipe(
          mergeMap(({ id }) =>
            this.courseService
              .getCourseById(id)
              .pipe(map(course => course.elements[element_index]))
          )
        )
      ),
      tap(element => {
        if (element.frame) {
          return this.selectPresentation(element);
        }
        return this.selectActivity(element);
      })
    );
  }

  public getUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  public selectPresentation(presentation: any) {
    this.frameUrl = this.getUrl(presentation.frame);
    let audioSync = presentation.audio_sync;
    if (audioSync) {
      audioSync = `{${audioSync}}`;
      this.times = JSON.parse(audioSync);
    }
  }

  public selectActivity(activity: any) {
    Survey.Survey.cssType = 'bootstrap';
    const surveyQuestions = activity.questions.map((question, index) => {
      return {
        ...question,
        name: index.toString(),
        type: 'radiogroup',
      };
    });
    const json = {
      title: activity.name,
      pages: [
        {
          questions: surveyQuestions,
        },
      ],
      completedHtml:
        '<h4>Has respondido correctamente <b>{correctedAnswers}</b> preguntas de <b>{questionCount}</b>.</h4>',
      completeText: 'Calificar',
    };
    const survey = new Survey.Model(json);

    survey.onComplete.add(result => {
      console.log(result);
      this.route.params
        .pipe(
          switchMap(({ element_index }) =>
            this.route.parent.params.pipe(
              mergeMap(({ id }) =>
                this.courseService
                  .getCourseById(id)
                  .pipe(map(course => course.elements[element_index]))
              )
            )
          ),
          (takeLast(1),
          switchMap(element => {
            return this.userService.completeLesson('activity', element.id);
          }))
        )
        .subscribe(res => {});
    });

    setTimeout(() => {
      Survey.SurveyNG.render('show-activity', { model: survey });
    }, 100);
  }

  // tslint:disable-next-line:align
  changeSelect(select): void {
    this.select = select;
  }

  toggleSideBar() {
    this.collapsedSideBar = !this.collapsedSideBar;
  }

  ngOnDestroy() {
    this.frameUrl = null;
    this.element$ = null;
  }
}
