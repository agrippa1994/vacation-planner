import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashboxPage } from './cashbox.page';

describe('CashboxPage', () => {
  let component: CashboxPage;
  let fixture: ComponentFixture<CashboxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashboxPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashboxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
