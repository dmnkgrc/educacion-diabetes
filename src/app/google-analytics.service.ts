import { Injectable } from '@angular/core';

declare let ga: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  constructor() { }

  // create our event emitter to send our data to Google Analytics
  public eventEmitter(eventCategory: string, eventAction: string, eventLabel: string = null, eventValue: number | string = null) {
    ga('send', 'event', {
      eventCategory,
      eventLabel,
      eventAction,
      eventValue
    });

  }

  public setUserId(id: number)  {
    ga('set', 'userId', id.toString());
  }
}
