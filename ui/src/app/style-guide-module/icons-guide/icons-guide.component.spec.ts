import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconsGuideComponent } from './icons-guide.component';

describe('IconsGuideComponent', () => {
  let component: IconsGuideComponent;
  let fixture: ComponentFixture<IconsGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconsGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconsGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
