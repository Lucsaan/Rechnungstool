import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyTableComponent } from './journey-table.component';

describe('JourneyTableComponent', () => {
  let component: JourneyTableComponent;
  let fixture: ComponentFixture<JourneyTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JourneyTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
