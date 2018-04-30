import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpesentableComponent } from './spesentable.component';

describe('SpesentableComponent', () => {
  let component: SpesentableComponent;
  let fixture: ComponentFixture<SpesentableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpesentableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpesentableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
