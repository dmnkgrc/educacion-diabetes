import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { config } from '../config';
import { SessionService } from './session.service';

@Injectable({ providedIn: 'root' })


export class UserService {
    rootURL: string = config.rootURL;
    signupEndpoint: string = config.apiEndPoints.signup;
    studentsEndpoint: string = config.apiEndPoints.students;
    getUserEndpoint: string = config.apiEndPoints.getUser;
    constructor(
        public http: HttpClient,
        public sessionService: SessionService
      ) {}


    public signup(data: any): Observable<any> {
        const headers: HttpHeaders = new HttpHeaders({
          Accept: 'application/json',
          'Content-Type': 'application/json'
        });
        return this.http.post(this.rootURL + this.signupEndpoint, data, { headers })
          .pipe(
            tap((res: any) => {
              // tslint:disable-next-line:no-string-literal
              this.sessionService.setCurrentUser(res['user']);
            }),
            catchError(error => of(error))
          );
    }

    public getAllStudents(): Observable<any> {
      const headers: HttpHeaders = new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      });
      return this.http.get(this.rootURL + this.studentsEndpoint, {headers}).pipe(
        tap((res: any) => {
          console.log(res);
        }),
        catchError(error => of(error))
      );
    }

    public getUserById(userId: any): Observable<any> {
      const headers: HttpHeaders = new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      });
      return this.http.get(this.rootURL + this.getUserEndpoint + userId, {headers}).pipe(
        tap((res: any) => {
          console.log(res);
        }),
        catchError(error => of(error))
      );
    }

    public getUserCourses(userId: any): Observable<any> {
      const headers: HttpHeaders = new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      });
      return this.http.get(this.rootURL + `/users/${userId}/courses`, {headers}).pipe(
        tap((res: any) => {
          console.log(res);
        }),
        catchError(error => of(error))
      );
    }

    public deleteUserById(userId: any): Observable<any> {
      const headers: HttpHeaders = new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      });
      return this.http.delete(this.rootURL + this.getUserEndpoint + userId, {headers}).pipe(
        tap((res: any) => {
          console.log(res);
        }),
        catchError(error => of(error))
      );
    }

    public updateUser(user: any): Observable<any> {
      const headers: HttpHeaders = new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      });
      return this.http.put(this.rootURL + this.getUserEndpoint + `${user.user_id}`, user, { headers });
    }
}
