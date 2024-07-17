import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalDevicesComponent } from './clinical-devices.component';

describe('ClinicalDevicesComponent', () => {
  let component: ClinicalDevicesComponent;
  let fixture: ComponentFixture<ClinicalDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicalDevicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClinicalDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
