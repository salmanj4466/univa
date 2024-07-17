import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteOverviewInfoComponent } from './site-overview-info.component';

describe('SiteOverviewInfoComponent', () => {
  let component: SiteOverviewInfoComponent;
  let fixture: ComponentFixture<SiteOverviewInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteOverviewInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SiteOverviewInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
