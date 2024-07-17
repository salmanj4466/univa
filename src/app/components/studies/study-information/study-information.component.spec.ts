import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyInformationComponent } from './study-information.component';

describe('StudyInformationComponent', () => {
  let component: StudyInformationComponent;
  let fixture: ComponentFixture<StudyInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudyInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
