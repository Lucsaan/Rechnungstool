import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorEditorComponent } from './vendor-editor.component';

describe('VendorEditorComponent', () => {
  let component: VendorEditorComponent;
  let fixture: ComponentFixture<VendorEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
