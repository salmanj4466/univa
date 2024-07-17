import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnSiteMeasurementsComponent } from './on-site-measurements.component';

describe('OnSiteMeasurementsComponent', () => {
  let component: OnSiteMeasurementsComponent;
  let fixture: ComponentFixture<OnSiteMeasurementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnSiteMeasurementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnSiteMeasurementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
