import {
  Component,
  OnInit,
  HostListener,
  OnDestroy,
  ViewChild,
  OnChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../services/course.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { mergeMap, switchMap, map, tap, takeLast } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as Survey from 'survey-angular';
import { UserService } from '../services/user.service';
import { AppState } from '../store/state/app.state';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../store/selectors/user.selectors';
import { CommentService } from '../services/comment.service';
import { BibliographyService } from '../services/bibliography.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-course-show',
  templateUrl: './course-show.component.html',
  styleUrls: ['./course-show.component.css'],
})
export class CourseShowComponent implements OnInit, OnDestroy {
  select = 'first';
  course: any;
  presentationIndex: number;
  selectedCourse: any;
  frameUrl: SafeResourceUrl = null;
  times: any = null;
  currentSlide: any;
  collapsedSideBar = true;
  isLastLesson = false;
  finished = false;
  element$: Observable<any>;
  presentationId: any;
  userId: number;
  content: any;
  comments: any;
  chosenOption = 'comments';
  bibBody: any;
  bibUrl: any;
  references: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private sanitizer: DomSanitizer,
    private userService: UserService,
    private store: Store<AppState>,
    private commentService: CommentService,
    private changeDetector: ChangeDetectorRef,
    private bibliographyService: BibliographyService
  ) {
    this.finished = false;
  }

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
      if (data.eventName === 'ready') {
        this.finished = false;
      }
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
      const lastSlide$ = this.route.params
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
            console.log('this one was called then');
            this.finished = true;
            return this.userService.completeLesson('presentation', element.id);
          }))
        )
        .subscribe(res => {
          lastSlide$.unsubscribe();
        });
    }
    return;
  }

  ngOnInit() {
    this.finished = false;

    this.element$ = this.route.params.pipe(
      switchMap(({ element_index }) =>
        this.route.parent.params.pipe(
          mergeMap(({ id }) =>
            this.courseService.getCourseById(id).pipe(
              tap(course => {
                this.course = course;
                this.presentationIndex = Number(element_index);
                this.finished = false;
                this.isLastLesson = false;
                if (course.elements.length - 1 === Number(element_index)) {
                  this.isLastLesson = true;
                }
              }),
              map(course => course.elements[element_index])
            )
          )
        )
      ),
      tap(element => {
        this.finished = false;
        this.changeDetector.markForCheck();
        if (element.frame) {
          return this.selectPresentation(element);
        }
        return this.selectActivity(element);
      })
    );
  }

  public goToNextLesson() {
    this.finished = false;
    this.changeDetector.markForCheck();
    if (this.isLastLesson) {
      this.router.navigate(['/inicio/cursos']);
      return;
    }
    this.router.navigate([
      '/inicio/cursos',
      this.course.id,
      this.presentationIndex + 1,
    ]);
  }

  public changeOption(option: string){
    this.chosenOption = option;
  }

  public getUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${url}&style=hidden`);
  }

  public selectPresentation(presentation: any) {
    this.presentationId = presentation.id;
    this.getComments();
    this.getReferences();
    this.store.select(selectCurrentUser).subscribe(user => {
      this.userId = user.user_id;
    });
    this.frameUrl = this.getUrl(presentation.frame);
    this.finished = false;
    let audioSync = presentation.audio_sync;
    if (audioSync) {
      audioSync = `{${audioSync}}`;
      this.times = JSON.parse(audioSync);
    }
  }

  public createComment() {
    const data = {
      content: this.content,
      user: this.userId,
      presentation: this.presentationId
    };
    this.commentService.createComment(data).subscribe((res) => {
      this.comments.push(res);
      this.content = '';
    });
  }

  public getComments() {
    this.courseService.getPresentationComments(this.presentationId).subscribe(res => { this.comments = res; });
  }

  public createReference() {

    const data = {
      body: this.bibBody,
      url: this.bibUrl,
      presentation: this.presentationId
    };
    this.bibliographyService.createBibliography(data).subscribe((res) => {
      this.references.push(res);
      this.content = '';
    });
  }

  public getReferences() {
    this.courseService.getPresentationBibliography(this.presentationId).subscribe(res => { this.references = res; });
  }

  public selectActivity(activity: any) {
    this.finished = false;
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
      const surveyCompletion$ = this.route.params
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
            const correct = result.getCorrectedAnswerCount();
            const questionCount = result.getAllQuestions().length;
            const grade = correct / questionCount * 10;
            this.finished = true;
            return this.userService.completeLesson('activity', element.id, grade);
          }))
        )
        .subscribe(res => {
          surveyCompletion$.unsubscribe();
        });
    });

    setTimeout(() => {
      Survey.SurveyNG.render('show-activity', { model: survey });
    }, 100);
  }

  changeSelect(select): void {
    this.select = select;
  }

  toggleSideBar() {
    this.collapsedSideBar = !this.collapsedSideBar;
  }

  ngOnDestroy() {
    this.frameUrl = null;
    this.element$ = null;
    this.finished = false;
  }
}
