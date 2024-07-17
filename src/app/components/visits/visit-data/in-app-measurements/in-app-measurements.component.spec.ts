import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InAppMeasurementsComponent } from './in-app-measurements.component';

describe('InAppMeasurementsComponent', () => {
  let component: InAppMeasurementsComponent;
  let fixture: ComponentFixture<InAppMeasurementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InAppMeasurementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InAppMeasurementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
