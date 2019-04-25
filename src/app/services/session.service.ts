import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { config } from '../config';

@Injectable({ providedIn: 'root' })


export class SessionService {
    rootURL: string = config.rootURL;
    authEndpoint: string = config.apiEndPoints.auth;
    token: string;
    constructor(
        public http: HttpClient,
      ) {}


    public authenticate(email: string, password: string): Observable<any> {
        const headers: HttpHeaders = new HttpHeaders({
          Accept: 'application/json',
          'Content-Type': 'application/json'
        });
        const body: any = {
          username: email,
          password
        };
        return this.http.post(this.rootURL + this.authEndpoint, body, { headers })
          .pipe(
            tap((res: any) => {
              this.token = res;
            }),
            catchError(error => of(error))
          );
      }
}
