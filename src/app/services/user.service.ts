import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { config } from '../config';

@Injectable({ providedIn: 'root' })


export class UserService {
    rootURL: string = config.rootURL;
    userEndpoint: string = config.apiEndPoints.users;
    signupEndpoint: string = config.apiEndPoints.signup;
    token: string;
    constructor(
        public http: HttpClient,
      ) {}


    public signup(data: any): Observable<any> {
        const headers: HttpHeaders = new HttpHeaders({
          Accept: 'application/json',
          'Content-Type': 'application/json'
        });
        return this.http.post(this.rootURL + this.signupEndpoint, data, { headers })
          .pipe(
            tap((res: any) => {
              this.token = res;
            }),
            catchError(error => of(error))
          );
    }
}
