import { Component } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-study-information',
  standalone: true,
  imports: [NgbTooltipModule],
  templateUrl: './study-information.component.html',
  styleUrl: './study-information.component.scss',
})
export class StudyInformationComponent {}
