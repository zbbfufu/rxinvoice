import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SquickStatusEditPanelComponent } from './squick-status-edit-panel.component';

describe('SquickStatusEditPanelComponent', () => {
  let component: SquickStatusEditPanelComponent;
  let fixture: ComponentFixture<SquickStatusEditPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SquickStatusEditPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SquickStatusEditPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
