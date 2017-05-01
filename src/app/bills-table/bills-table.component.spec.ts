import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsTableComponent } from './bills-table.component';

describe('BillsTableComponent', () => {
  let component: BillsTableComponent;
  let fixture: ComponentFixture<BillsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
