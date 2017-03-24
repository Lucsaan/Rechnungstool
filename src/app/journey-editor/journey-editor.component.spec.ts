import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyEditorComponent } from './journey-editor.component';

describe('JourneyEditorComponent', () => {
  let component: JourneyEditorComponent;
  let fixture: ComponentFixture<JourneyEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JourneyEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
