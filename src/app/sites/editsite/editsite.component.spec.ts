import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsiteComponent } from './editsite.component';

describe('EditsiteComponent', () => {
  let component: EditsiteComponent;
  let fixture: ComponentFixture<EditsiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditsiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
