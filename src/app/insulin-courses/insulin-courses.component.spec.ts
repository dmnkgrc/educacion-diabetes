import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsulinCoursesComponent } from './insulin-courses.component';

describe('InsulinCoursesComponent', () => {
  let component: InsulinCoursesComponent;
  let fixture: ComponentFixture<InsulinCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsulinCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsulinCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
