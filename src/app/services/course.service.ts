import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { config } from '../config';
import { SessionService } from './session.service';

@Injectable({ providedIn: 'root' })
export class CourseService {
  rootURL: string = config.rootURL;
  apiEnpoints = config.apiEndPoints;
  userEndpoint: string = config.apiEndPoints.users;
  signupEndpoint: string = config.apiEndPoints.signup;
  studentsEndpoint: string = config.apiEndPoints.students;
  getUserEndpoint: string = config.apiEndPoints.getUser;
  constructor(public http: HttpClient, public sessionService: SessionService) {}

  private getCourseWithElements(course: any): any {
    course.elements = [...course.presentations_list, ...course.activities_list];
    course.elements.sort((a, b) => {
      if (a.position < b.position) {
        return -1;
      } else if (b.position < a.position) {
        return 1;
      } else if (a.frame && !b.frame) {
        return -1;
      } else if (b.frame && !a.frame) {
        return 1;
      }
      return 0;
    });
    return course;
  }

  public getAllCourses(): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    });
    return this.http
      .get(`${this.rootURL}${this.apiEnpoints.courses}`, { headers })
      .pipe(
        map((res: any) => {
          return res.map(course => this.getCourseWithElements(course));
        }),
        catchError(error => of(error))
      );
  }

  public getCourseById(courseId: number): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    });
    return this.http
      .get(`${this.rootURL}${this.apiEnpoints.courses}${courseId}`, { headers })
      .pipe(
        map((res: any) => {
          return this.getCourseWithElements(res);
        }),
        catchError(error => of(error))
      );
  }

  public createCourse(data: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    });
    const course = {
      name: data.name,
      description: data.description,
      users: data.users,
    };
    return this.http
      .post(
        `${this.rootURL}${this.apiEnpoints.courses}`,
        {
          course,
        },
        { headers }
      )
      .pipe(
        tap((res: any) => {
          console.log(res);
        }),
        catchError(error => of(error))
      );
  }

  public editCourse(data: any, id: number): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    });
    const course = {
      name: data.name,
      description: data.description,
      users: data.users,
    };
    return this.http
      .put(
        `${this.rootURL}${this.apiEnpoints.courses}${id}`,
        {
          course,
        },
        { headers }
      )
      .pipe(
        tap((res: any) => {
          console.log(res);
        }),
        catchError(error => of(error))
      );
  }

  public deleteCourse(id: number): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    });
    return this.http
      .delete(`${this.rootURL}${this.apiEnpoints.courses}${id}`, { headers })
      .pipe(
        tap((res: any) => {
          console.log(res);
        }),
        catchError(error => of(error))
      );
  }

  public createPresentation(data: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    });
    const presentation = {
      title: data.title,
      frame: data.frame,
      courses_id: data.coursesId,
      audio_url: data.audioUrl,
      audio_sync: data.audioSync,
      position: data.position,
    };
    return this.http
      .post(
        `${this.rootURL}${this.apiEnpoints.presentations}`,
        {
          presentation,
        },
        { headers }
      )
      .pipe(
        tap((res: any) => {
          console.log(res);
        }),
        catchError(error => of(error))
      );
  }

  public editPresentation(data: any, id: number): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    });
    const presentation = {
      title: data.title,
      frame: data.frame,
      courses_id: data.coursesId,
      audio_url: data.audioUrl,
      audio_sync: data.audioSync,
      position: data.position,
    };
    return this.http
      .put(
        `${this.rootURL}${this.apiEnpoints.presentations}${id}`,
        {
          presentation,
        },
        { headers }
      )
      .pipe(
        tap((res: any) => {
          console.log(res);
        }),
        catchError(error => of(error))
      );
  }

  public deletePresentation(id: number): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    });
    return this.http
      .delete(`${this.rootURL}${this.apiEnpoints.presentations}${id}`, {
        headers,
      })
      .pipe(
        tap((res: any) => {
          console.log(res);
        }),
        catchError(error => of(error))
      );
  }

  public createActivity(data: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    });
    const activity = {
      name: data.name,
      questions: data.questions,
      position: data.position,
      courses_id: data.coursesId,
    };
    return this.http
      .post(
        `${this.rootURL}${this.apiEnpoints.activities}`,
        {
          activity,
        },
        { headers }
      )
      .pipe(
        tap((res: any) => {
          console.log(res);
        }),
        catchError(error => of(error))
      );
  }

  public editActivity(data: any, id: number): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    });
    const activity = {
      name: data.name,
      questions: data.questions,
      position: data.position,
      courses_id: data.coursesId,
    };
    return this.http
      .put(
        `${this.rootURL}${this.apiEnpoints.activities}${id}`,
        {
          activity,
        },
        { headers }
      )
      .pipe(
        tap((res: any) => {
          console.log(res);
        }),
        catchError(error => of(error))
      );
  }

  public deleteActivity(id: number): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    });
    return this.http
      .delete(`${this.rootURL}${this.apiEnpoints.activities}${id}`, {
        headers,
      })
      .pipe(
        tap((res: any) => {
          console.log(res);
        }),
        catchError(error => of(error))
      );
  }
}
