import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsulinAppComponent } from './insulin-app.component';

describe('InsulinAppComponent', () => {
  let component: InsulinAppComponent;
  let fixture: ComponentFixture<InsulinAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InsulinAppComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsulinAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
