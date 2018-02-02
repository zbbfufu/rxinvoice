import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceLinesDetailComponent } from './invoice-lines-detail.component';

describe('InvoiceLinesDetailComponent', () => {
  let component: InvoiceLinesDetailComponent;
  let fixture: ComponentFixture<InvoiceLinesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceLinesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceLinesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
