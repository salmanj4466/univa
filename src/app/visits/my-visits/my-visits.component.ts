import { Component } from '@angular/core';
import { VisitListComponent } from '../../components/visits/my-visits/visit-list/visit-list.component';
import { CalendarViewComponent } from '../../components/visits/my-visits/calendar-view/calendar-view.component';

@Component({
  selector: 'app-my-visits',
  standalone: true,
  imports: [VisitListComponent, CalendarViewComponent],
  templateUrl: './my-visits.component.html',
  styleUrl: './my-visits.component.scss',
})
export class MyVisitsComponent {}
