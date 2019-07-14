import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseIntroComponent } from './course-intro.component';

describe('AdminCoursesComponent', () => {
  let component: CourseIntroComponent;
  let fixture: ComponentFixture<CourseIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
