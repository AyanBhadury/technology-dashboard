import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentTrendKpiComponent } from './current-trend-kpi.component';

describe('CurrentTrendKpiComponent', () => {
  let component: CurrentTrendKpiComponent;
  let fixture: ComponentFixture<CurrentTrendKpiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentTrendKpiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentTrendKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
