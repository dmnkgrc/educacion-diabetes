import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {Router, NavigationEnd} from '@angular/router'; // import Router and NavigationEnd
import { AppState } from './store/state/app.state';

// declare ga as a function to set and sent the events
declare let ga: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'educamed';
  constructor(
    private store: Store<AppState>,
    public router: Router
  ) {
    // subscribe to router events and send page views to Google Analytics
    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');

      }

    });
  }
}
