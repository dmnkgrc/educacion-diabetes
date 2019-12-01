import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsulinFaqComponent } from './insulin-faq.component';

describe('InsulinFaqComponent', () => {
  let component: InsulinFaqComponent;
  let fixture: ComponentFixture<InsulinFaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsulinFaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsulinFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
