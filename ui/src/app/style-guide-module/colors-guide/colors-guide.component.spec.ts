import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorsGuideComponent } from './colors-guide.component';

describe('ColorsGuideComponent', () => {
  let component: ColorsGuideComponent;
  let fixture: ComponentFixture<ColorsGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorsGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorsGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
