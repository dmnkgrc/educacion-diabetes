import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsulinGlossaryComponent } from './insulin-glossary.component';

describe('InsulinGlossaryComponent', () => {
  let component: InsulinGlossaryComponent;
  let fixture: ComponentFixture<InsulinGlossaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsulinGlossaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsulinGlossaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
