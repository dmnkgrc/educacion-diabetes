import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { config } from '../config';
import { SessionService } from './session.service';

@Injectable({ providedIn: 'root' })
export class CommentService {
  rootURL: string = config.rootURL;
  apiEnpoints = config.apiEndPoints;
  commentEndpoint: string = config.apiEndPoints.comments;

  constructor(public http: HttpClient, public sessionService: SessionService) {}

  public createComment(data: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    });
    const comment = {
      content: data.content,
      user_id: data.user,
      presentation_id: data.presentation,
    };
    return this.http
      .post(`${this.rootURL}${this.commentEndpoint}`, { comment }, { headers })
      .pipe(
        tap((res: any) => {
          console.log(res);
        }),
        catchError(error => of(error))
      );
  }

  public getLastComments(): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    });
    return this.http.get(`${this.rootURL}/last_comments`, { headers }).pipe(
      tap((res: any) => {
        console.log(res);
      }),
      catchError(error => of(error))
    );
  }
}
