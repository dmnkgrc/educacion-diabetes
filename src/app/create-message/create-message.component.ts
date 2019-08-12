import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { AppState } from '../store/state/app.state';
import { Store } from '@ngrx/store';
import { GetUsers, GetUsersSuccess } from '../store/actions/user.actions';
import { selectAllUsersById, selectCurrentUser } from '../store/selectors/user.selectors';
import { UserService } from '../services/user.service';
import { filter, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.scss'],
})
export class CreateMessageComponent implements OnInit {
  allUsers: any;
  messageRecipients = [];
  selectedCourses = [];
  public loading = true;
  selection = 'users';
  subject = '';
  content = '';
  currentUser: any;
  allCourses: any;
  constructor(
    public messageService: MessageService,
    public store: Store<AppState>,
    public userService: UserService,
    public router: Router,
    public courseService: CourseService
  ) {
    this.userService.getAllStudents().toPromise().then(students => {
      this.store.dispatch(new GetUsersSuccess(students));
    });
    this.store.select(selectCurrentUser).pipe(
      filter(e => !!e),
      tap(user => this.currentUser = user),
    ).subscribe();
    this.courseService.getAllCourses().toPromise().then(courses => {
      this.allCourses = courses;
    });
  }
  ngOnInit() {
    this.store.dispatch(new GetUsers());
    this.store.select(selectAllUsersById).subscribe(allUsers => {
      if (allUsers) {
        this.allUsers = Object.values(allUsers);
      }
    });
  }

  switchSelection(selection) {
    this.selection = selection;
  }
  removeRecipient(itemId) {
    this.messageRecipients = this.messageRecipients.filter(
      recipient => recipient !== itemId
    );
  }

  removeCourse(itemId) {
    this.selectedCourses = this.selectedCourses.filter(
      course => course !== itemId
    );
  }

  sendMessage() {
    const data = {
      recipients: this.messageRecipients,
      subject: this.subject,
      content: this.content,
      sender_id: this.currentUser.user_id
    };
    console.log('data', data);
    this.messageService.createMessage(data).subscribe(() => {
      this.router.navigateByUrl('/messages');
    });
  }

  sendCourseMessage() {
    const data = {
      courses_ids: this.selectedCourses,
      subject: this.subject,
      content: this.content,
      sender_id: this.currentUser.user_id
    };
    console.log('data', data);
    this.messageService.createCourseMessage(data).subscribe(() => {
      this.router.navigateByUrl('/messages');
    });
  }

}
