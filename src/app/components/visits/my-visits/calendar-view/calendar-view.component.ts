import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
  selector: 'app-calendar-view',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './calendar-view.component.html',
  styleUrl: './calendar-view.component.scss',
})
export class CalendarViewComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    events: [
      {
        title: 'All Day Event',
        date: '2024-05-01',
        backgroundColor: '#4d6b7e',
        borderColor: '#4d6b7e',
      },
      {
        title: 'Dinner',
        date: '2024-05-10',
        backgroundColor: '#dae032',
        borderColor: '#dae032',
      },
      {
        title: 'Meetings',
        start: '2024-05-13',
        end: '2024-05-15',
        backgroundColor: '#e87b10',
        borderColor: '#e87b10',
      },
    ],
  };

  ngOnInit(): void {}
}
