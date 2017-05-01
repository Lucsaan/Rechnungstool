import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseBillComponent } from './choose-bill.component';

describe('ChooseBillComponent', () => {
  let component: ChooseBillComponent;
  let fixture: ComponentFixture<ChooseBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
