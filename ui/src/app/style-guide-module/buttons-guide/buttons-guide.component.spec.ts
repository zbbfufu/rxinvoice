import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsGuideComponent } from './buttons-guide.component';

describe('ButtonsGuideComponent', () => {
  let component: ButtonsGuideComponent;
  let fixture: ComponentFixture<ButtonsGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonsGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
