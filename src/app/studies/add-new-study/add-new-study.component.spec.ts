import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewStudyComponent } from './add-new-study.component';

describe('AddNewStudyComponent', () => {
  let component: AddNewStudyComponent;
  let fixture: ComponentFixture<AddNewStudyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewStudyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddNewStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
