import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsGuideComponent } from './forms-guide.component';

describe('FormsGuideComponent', () => {
  let component: FormsGuideComponent;
  let fixture: ComponentFixture<FormsGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
