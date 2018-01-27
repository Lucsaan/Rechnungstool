import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpesenPopupComponent } from './spesen-popup.component';

describe('SpesenPopupComponent', () => {
  let component: SpesenPopupComponent;
  let fixture: ComponentFixture<SpesenPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpesenPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpesenPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
