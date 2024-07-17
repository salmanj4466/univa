import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcfsComponent } from './icfs.component';

describe('IcfsComponent', () => {
  let component: IcfsComponent;
  let fixture: ComponentFixture<IcfsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IcfsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IcfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
