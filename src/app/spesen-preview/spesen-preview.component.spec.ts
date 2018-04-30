import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpesenPreviewComponent } from './spesen-preview.component';

describe('SpesenPreviewComponent', () => {
  let component: SpesenPreviewComponent;
  let fixture: ComponentFixture<SpesenPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpesenPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpesenPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
