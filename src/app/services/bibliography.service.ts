import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { config } from '../config';
import { SessionService } from './session.service';

@Injectable({ providedIn: 'root' })
export class BibliographyService {
  rootURL: string = config.rootURL;
  apiEnpoints = config.apiEndPoints;
  bibliographiesEndpoint: string = config.apiEndPoints.bibliographies;

  constructor(public http: HttpClient, public sessionService: SessionService) {}

  public createBibliography(data: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    });
    const bibliography = {
      body: data.body,
      url: data.url,
      presentation_id: data.presentation,
    };
    return this.http.post(`${this.rootURL}${this.bibliographiesEndpoint}`, {bibliography}, { headers })
      .pipe(
        tap((res: any) => {
          console.log(res);
        }),
        catchError(error => of(error))
      );
  }
}
