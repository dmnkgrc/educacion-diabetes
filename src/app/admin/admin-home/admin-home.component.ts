import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { CommentService } from 'src/app/services/comment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  collapsedSideBar = true;
  courses$: any;
  comments$: any;
  constructor(
    private courseService: CourseService,
    private commentsService: CommentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.courses$ = this.courseService.getLastCourses();
    this.comments$ = this.commentsService.getLastComments();
  }
  toggleSideBar() {
    this.collapsedSideBar = !this.collapsedSideBar;
  }

  getInitials(currentUser: any) {
    let initials = '';
    initials = currentUser.first_name[0] + currentUser.last_name[0];
    return initials;
  }

  navigateToCourse(course) {
    this.router.navigateByUrl(`/admin/cursos/${course.id}`);
  }

  navigateToMessages() {
    this.router.navigateByUrl('/admin/mensajes');
  }

  navigateToProfile() {
    this.router.navigateByUrl('/admin/perfil');
  }
}
