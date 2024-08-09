import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditstudyComponent } from './editstudy.component';

describe('EditstudyComponent', () => {
  let component: EditstudyComponent;
  let fixture: ComponentFixture<EditstudyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditstudyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditstudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
