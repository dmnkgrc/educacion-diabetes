import { Component, OnInit, HostListener } from '@angular/core';
import { CourseService } from '../services/course.service';
import { Observable } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserService } from '../services/user.service';
import { map } from 'rxjs/operators';
import * as Survey from 'survey-angular';
import { CommentService } from '../services/comment.service';
import { AppState } from '../store/state/app.state';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../store/selectors/user.selectors';
import { BibliographyService } from '../services/bibliography.service';
import { User } from '../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { $ } from 'protractor';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.scss'],
})
export class AdminCoursesComponent implements OnInit {
  public showCourse = false;
  public showActivity = false;
  private editPresentationMode = false;
  private editActivityMode = false;
  public editCourseMode = false;
  private presentationId: number;
  private activityId: number;
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
  public clustersId: number[];
  public questions: any[] = [
    {
      title: '',
      choices: [''],
      correctAnswer: '',
    },
  ];
  public times: any;
  public courses$: Observable<any>;
  public clusters$: Observable<any>;
  public currentSlide: any = 1;
  public frameUrl: SafeResourceUrl;
  public students$: Observable<any>;
  collapsedSideBar = true;
  content: any;
  userId: any;
  chosenOption = 'comments';
  comments: any;
  bibBody: any;
  bibUrl: any;
  references: any;

  constructor(
    private courseService: CourseService,
    private sanitizer: DomSanitizer,
    private userService: UserService,
    private commentService: CommentService,
    private store: Store<AppState>,
    private bibliographyService: BibliographyService,
    public route: ActivatedRoute
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
    }
    return;
  }

  ngOnInit() {
    this.courses$ = this.courseService.getAllCourses();
    this.courses$.subscribe(courses => {
      this.route.params.subscribe(params => {
        if (params.id) {
          const course = courses.find(c => Number(c.id) === Number(params.id));
          this.editCourse(null, course, true);
        }
      });
    });
    this.students$ = this.userService.getAllStudents();
    this.clusters$ = this.userService.getAllClusters();
    this.store
      .select(selectCurrentUser)
      .subscribe(user => (this.userId = user.user_id));
  }

  public toggleCourse() {
    this.showCourse = !this.showCourse;
  }

  public toggleActivity() {
    this.showActivity = !this.showActivity;
  }

  public getUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  public selectPresentation(presentation: any, event: any) {
    if (typeof event.target.className !== 'string') {
      return;
    }
    this.selectedCourse = presentation;
    this.getComments();
    this.getReferences();
    this.frameUrl = this.getUrl(presentation.frame);
    let audioSync = presentation.audio_sync;
    if (audioSync) {
      audioSync = `{${audioSync}}`;
      this.times = JSON.parse(audioSync);
    }
    this.toggleCourse();
  }

  public changeOption(option: string) {
    this.chosenOption = option;
  }

  public createComment() {
    const data = {
      content: this.content,
      user: this.userId,
      presentation: this.selectedCourse.id,
    };
    this.commentService.createComment(data).subscribe(res => {
      this.comments.push(res);
      this.content = '';
    });
  }

  getInitials(currentUser: User) {
    let initials = '';
    initials = currentUser.first_name[0] + currentUser.last_name[0];
    return initials;
  }

  public getComments() {
    this.courseService
      .getPresentationComments(this.selectedCourse.id)
      .subscribe(res => {
        this.comments = res;
      });
  }

  public createReference() {
    const data = {
      body: this.bibBody,
      url: this.bibUrl,
      presentation: this.selectedCourse.id,
    };
    this.bibliographyService.createBibliography(data).subscribe(res => {
      this.references.push(res);
      this.content = '';
    });
  }

  public getReferences() {
    this.courseService
      .getPresentationBibliography(this.selectedCourse.id)
      .subscribe(res => {
        this.references = res;
      });
  }

  public selectActivity(activity: any, event: any) {
    if (typeof event.target.className !== 'string') {
      return;
    }
    this.selectedCourse = activity;
    this.toggleActivity();
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
    });

    setTimeout(() => {
      Survey.SurveyNG.render('show-activity', { model: survey });
    }, 100);
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
      if (this.editActivityMode) {
        this.editActivityMode = false;
        return this.courseService
          .editActivity(data, this.activityId)
          .subscribe(presentation => {
            this.courses$ = this.courseService.getAllCourses();
          });
      }
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
        clusters: this.clustersId || [],
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

  public editActivity(event: any, activity: any, id: number) {
    this.name = activity.name;
    this.questions = activity.questions;
    this.coursesId = id;
    this.position = activity.position;
    this.editActivityMode = true;
    this.activityId = activity.id;
  }

  public editCourse(event: any, course: any, popModal = false) {
    this.name = course.name;
    this.description = course.description;
    this.editCourseMode = true;
    this.courseId = course.id;
    this.usersId = course.all_users.map(user => user.id);
    this.clustersId = course.clusters.map(cluster => cluster.id);
    if (popModal) {
      setTimeout(() => {
        const search = 'edit-courses-' + this.courseId;
        document.getElementById(search).click();
      }, 1000);
    }
  }

  public deletePresentation(event: any, id: number) {
    event.stopPropagation();
    if (confirm('¿Estás seguro?')) {
      return this.courseService.deletePresentation(id).subscribe(() => {
        this.courses$ = this.courseService.getAllCourses();
      });
    }
  }

  public deleteActivity(event: any, id: number) {
    event.stopPropagation();
    if (confirm('¿Estás seguro?')) {
      return this.courseService.deleteActivity(id).subscribe(() => {
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
