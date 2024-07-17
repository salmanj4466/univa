import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewParticipantComponent } from './add-new-participant.component';

describe('AddNewParticipantComponent', () => {
  let component: AddNewParticipantComponent;
  let fixture: ComponentFixture<AddNewParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewParticipantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddNewParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
