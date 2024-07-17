import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyOverviewDataComponent } from './study-overview-data.component';

describe('StudyOverviewDataComponent', () => {
  let component: StudyOverviewDataComponent;
  let fixture: ComponentFixture<StudyOverviewDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyOverviewDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudyOverviewDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
