import { Component } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-data-collection',
  standalone: true,
  imports: [NgbTooltipModule],
  templateUrl: './data-collection.component.html',
  styleUrl: './data-collection.component.scss',
})
export class DataCollectionComponent {}
