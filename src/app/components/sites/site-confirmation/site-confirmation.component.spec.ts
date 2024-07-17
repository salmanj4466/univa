import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteConfirmationComponent } from './site-confirmation.component';

describe('SiteConfirmationComponent', () => {
  let component: SiteConfirmationComponent;
  let fixture: ComponentFixture<SiteConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteConfirmationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SiteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
