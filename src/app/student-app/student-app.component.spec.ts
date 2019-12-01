import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAppComponent } from './student-app.component';

describe('StudentAppComponent', () => {
  let component: StudentAppComponent;
  let fixture: ComponentFixture<StudentAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudentAppComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
