import { Component } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-informed-consent-form',
  standalone: true,
  imports: [NgbTooltipModule],
  templateUrl: './informed-consent-form.component.html',
  styleUrl: './informed-consent-form.component.scss',
})
export class InformedConsentFormComponent {
  title = 'angular';
}
