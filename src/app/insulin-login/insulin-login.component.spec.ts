import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsulinLoginComponent } from './insulin-login.component';

describe('InsulinLoginComponent', () => {
  let component: InsulinLoginComponent;
  let fixture: ComponentFixture<InsulinLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InsulinLoginComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsulinLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
