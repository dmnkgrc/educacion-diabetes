import { Injectable } from '@angular/core';

declare let ga: any;
declare let gtag: any;

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
    console.log(id);
    if (window.ga) {
      gtag('set', {user_id: id.toString()});
      ga('set', 'userId', id.toString());
      ga('send', 'pageview');
      return;
    }
    setTimeout(() => {
      this.setUserId(id);
    }, 500);
  }

}
