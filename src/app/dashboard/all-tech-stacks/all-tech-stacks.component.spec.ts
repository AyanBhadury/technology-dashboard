import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTechStacksComponent } from './all-tech-stacks.component';

describe('AllTechStacksComponent', () => {
  let component: AllTechStacksComponent;
  let fixture: ComponentFixture<AllTechStacksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTechStacksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTechStacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
