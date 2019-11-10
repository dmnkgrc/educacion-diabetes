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
  authEndpoint: string = config.apiEndPoints.auth;
  studentsEndpoint: string = config.apiEndPoints.students;
  clustersEndpoint: string = config.apiEndPoints.clusters;
  getUserEndpoint: string = config.apiEndPoints.getUser;
  constructor(public http: HttpClient, public sessionService: SessionService) {}

  public signup(data: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
    return this.http
      .post(this.rootURL + this.signupEndpoint, data, { headers })
      .pipe(
        tap((res: any) => {
          // tslint:disable-next-line:no-string-literal
          this.sessionService.setCurrentUser(res['user']);
        }),
        catchError(error => of(error))
      );
  }

  public getAllClusters(): Observable<any[]> {
    const headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    });
    return this.http
      .get(this.rootURL + this.clustersEndpoint, { headers })
      .pipe(catchError(error => of(error)));
  }

  public getAllStudents(): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    });
    return this.http
      .get(this.rootURL + this.studentsEndpoint, { headers })
      .pipe(
        tap((res: any) => {
          console.log(res);
        }),
        catchError(error => of(error))
      );
  }

  public getUserById(userId: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    });
    return this.http
      .get(this.rootURL + this.getUserEndpoint + userId, { headers })
      .pipe(
        tap((res: any) => {
          console.log(res);
        }),
        catchError(error => of(error))
      );
  }

  public getUserGrades(userId: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    });
    return this.http
      .get(this.rootURL + this.getUserEndpoint + userId + '/grades', {
        headers,
      })
      .pipe(
        tap((res: any) => {
          console.log(res);
        }),
        catchError(error => of(error))
      );
  }

  public getUserCourses(userId: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    });
    return this.http
      .get(this.rootURL + `/users/${userId}/courses`, { headers })
      .pipe(
        tap((res: any) => {
          console.log(res);
        }),
        catchError(error => of(error))
      );
  }

  public getUserActions(userId: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    });
    return this.http
      .get(this.rootURL + `/users/${userId}/actions`, { headers })
      .pipe(
        tap((res: any) => {
          console.log(res);
        }),
        catchError(error => of(error))
      );
  }

  public deleteUserById(userId: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    });
    return this.http
      .delete(this.rootURL + this.getUserEndpoint + userId, { headers })
      .pipe(
        tap((res: any) => {
          console.log(res);
        }),
        catchError(error => of(error))
      );
  }

  public updateUser(user: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    });
    return this.http.put(
      this.rootURL + this.getUserEndpoint + `${user.user_id}`,
      user,
      { headers }
    );
  }

  public completeLesson(
    type: 'presentation' | 'activity',
    id: number,
    grade = null
  ) {
    const headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    });
    let data = null;
    if (type === 'activity') {
      data = {
        grade,
      };
    }
    return this.http.post(
      this.rootURL + this.getUserEndpoint + `view/${type}/${id}`,
      data,
      { headers }
    );
  }

  public recoverPassword(email: string) {
    const headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
    return this.http
      .post(
        `${this.rootURL}${this.authEndpoint}recover`,
        { email },
        { headers }
      )
      .pipe(catchError(error => of(error)));
  }

  public resetPassword(
    password: string,
    passwordConfirmation: string,
    token: string
  ) {
    const headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
    return this.http.put(
      `${this.rootURL}${this.authEndpoint}recover/${token}`,
      { password, password_confirmation: passwordConfirmation },
      { headers }
    );
  }

  public createCluster(data: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    });
    const cluster = {
      name: data.name,
      users: data.users,
    };
    return this.http
      .post(
        `${this.rootURL}${this.clustersEndpoint}`,
        {
          cluster,
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

  public editCluster(data: any, id: number): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    });
    const cluster = {
      name: data.name,
      users: data.users,
    };
    return this.http
      .put(
        `${this.rootURL}${this.clustersEndpoint}/${id}`,
        {
          cluster,
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

  public deleteCluster(clusterId: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    });
    return this.http
      .delete(`${this.rootURL}${this.clustersEndpoint}/${clusterId}`, {
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
