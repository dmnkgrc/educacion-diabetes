import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
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
    constructor(
        public http: HttpClient,
        public sessionService: SessionService
      ) {}

    public getAllCourses(): Observable<any> {
      const headers: HttpHeaders = new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')
      });
      return this.http.get(`${this.rootURL}${this.apiEnpoints.courses}`, {headers}).pipe(
        tap((res: any) => {
          console.log(res);
        }),
        catchError(error => of(error))
      );
    }

    public getCourseById(courseId: number): Observable<any> {
      const headers: HttpHeaders = new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')
      });
      return this.http.get(`${this.rootURL}${this.apiEnpoints.courses}${courseId}`, {headers}).pipe(
        tap((res: any) => {
          console.log(res);
        }),
        catchError(error => of(error))
      );
    }

    public createCourse(data: any): Observable<any> {
      const headers: HttpHeaders = new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')
      });
      const course = {
        name: data.name,
        description: data.description
      };
      return this.http.post(`${this.rootURL}${this.apiEnpoints.courses}`, {
        course
      }, {headers}).pipe(
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
        Authorization: localStorage.getItem('token')
      });
      const presentation = {
        title: data.title,
        frame: data.frame,
        courses_id: data.coursesId,
        audio_url: data.audioUrl,
        audio_sync: data.audioSync,
        position: data.position
      };
      return this.http.post(`${this.rootURL}${this.apiEnpoints.presentations}`, {
        presentation
      }, {headers}).pipe(
        tap((res: any) => {
          console.log(res);
        }),
        catchError(error => of(error))
      );
    }
}