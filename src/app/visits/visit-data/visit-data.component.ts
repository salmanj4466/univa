import { Component } from '@angular/core';
import { OnSiteMeasurementsComponent } from '../../components/visits/visit-data/on-site-measurements/on-site-measurements.component';
import { InAppMeasurementsComponent } from '../../components/visits/visit-data/in-app-measurements/in-app-measurements.component';

@Component({
  selector: 'app-visit-data',
  standalone: true,
  imports: [OnSiteMeasurementsComponent, InAppMeasurementsComponent],
  templateUrl: './visit-data.component.html',
  styleUrl: './visit-data.component.scss',
})
export class VisitDataComponent {}
