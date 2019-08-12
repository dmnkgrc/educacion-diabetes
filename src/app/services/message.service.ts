import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { config } from '../config';

@Injectable({ providedIn: 'root' })


export class MessageService {
    rootURL: string = config.rootURL;
    messagesEndpoint: string = config.apiEndPoints.messages;
    constructor(
        public http: HttpClient
      ) {}

    public getInbox(userId): Observable<any> {
      const headers: HttpHeaders = new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      });
      return this.http.get(this.rootURL + this.messagesEndpoint + `${userId}/received`, {headers}).pipe(
        tap((res: any) => {
          console.log(res);
        }),
        catchError(error => of(error))
      );
    }

    public getSentMessages(userId: any): Observable<any> {
      const headers: HttpHeaders = new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      });
      return this.http.get(this.rootURL + this.messagesEndpoint + `${userId}/sent`, {headers}).pipe(
        tap((res: any) => {
          console.log(res);
        }),
        catchError(error => of(error))
      );
    }

    public createMessage(data: any): Observable<any> {
        const headers: HttpHeaders = new HttpHeaders({
          Accept: 'application/json',
          'Content-Type': 'application/json'
        });
        return this.http.post(this.rootURL + this.messagesEndpoint, data, {headers}).pipe(
          tap((res: any) => {
            console.log(res);
          }),
          catchError(error => of(error))
        );
    }

    public createCourseMessage(data: any): Observable<any> {
        const headers: HttpHeaders = new HttpHeaders({
          Accept: 'application/json',
          'Content-Type': 'application/json'
        });
        return this.http.post(this.rootURL + this.messagesEndpoint + 'courses', data, {headers}).pipe(
          tap((res: any) => {
            console.log(res);
          }),
          catchError(error => of(error))
        );
    }
}
