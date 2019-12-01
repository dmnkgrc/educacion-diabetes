import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsulinHomeComponent } from './insulin-home.component';

describe('InsulinHomeComponent', () => {
  let component: InsulinHomeComponent;
  let fixture: ComponentFixture<InsulinHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InsulinHomeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsulinHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
