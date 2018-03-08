import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGuideComponent } from './dashboard-guide.component';

describe('DashboardGuideComponent', () => {
  let component: DashboardGuideComponent;
  let fixture: ComponentFixture<DashboardGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
