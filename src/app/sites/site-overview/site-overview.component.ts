import { Component } from '@angular/core';

import { SiteOverviewInfoComponent } from '../../components/sites/site-overview-info/site-overview-info.component';
import { ClinicalDevicesComponent } from '../../components/sites/clinical-devices/clinical-devices.component';

@Component({
  selector: 'app-site-overview',
  standalone: true,
  imports: [SiteOverviewInfoComponent, ClinicalDevicesComponent],
  templateUrl: './site-overview.component.html',
  styleUrl: './site-overview.component.scss',
})
export class SiteOverviewComponent {}
