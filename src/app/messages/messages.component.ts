import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state/app.state';
import { selectCurrentUser } from '../store/selectors/user.selectors';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  selection = 'inbox';
  currentUser: any;
  allMessages: string;
  collapsedSideBar = false;
  constructor(
    public messageService: MessageService,
    public store: Store<AppState>,
    public router: Router
  ) {
    this.store.select(selectCurrentUser).pipe(
      filter(e => !!e),
      tap(user => this.currentUser = user),
    ).subscribe();
  }

  ngOnInit() {
    this.fetchMessages();
  }

  switchSelection(selection) {
    this.selection = selection;
    this.fetchMessages();
  }

  compose() {
    this.router.navigateByUrl('/send-message');
  }

  fetchMessages() {
    console.log('fetching for user', this.currentUser);
    if (!this.currentUser) { return; }
    if (this.selection === 'inbox') {
      this.messageService.getInbox(this.currentUser.user_id).subscribe(messages => {
        this.allMessages = messages;
      });
      return;
    }
    this.messageService.getSentMessages(this.currentUser.user_id).subscribe(messages => {
      this.allMessages = messages;
    });
  }

  toggleSideBar() {
    this.collapsedSideBar = !this.collapsedSideBar;
  }
}
