import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdherenceStudyComponent } from './adherence-study.component';

describe('AdherenceStudyComponent', () => {
  let component: AdherenceStudyComponent;
  let fixture: ComponentFixture<AdherenceStudyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdherenceStudyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdherenceStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
