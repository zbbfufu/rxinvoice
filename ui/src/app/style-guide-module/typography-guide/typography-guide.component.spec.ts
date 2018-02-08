import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypographyGuideComponent } from './typography-guide.component';

describe('TypographyGuideComponent', () => {
  let component: TypographyGuideComponent;
  let fixture: ComponentFixture<TypographyGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypographyGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypographyGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
