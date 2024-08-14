import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-calendar-view',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss'],
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
    events: [],
    firstDay: 1, 
    eventDidMount: (info) => {
      if (info.view.type === 'dayGridMonth') {
        info.el.innerHTML = `${info.event.extendedProps['participantCode']} ${info.event.start.toLocaleTimeString()}`;
      } else {
        info.el.innerHTML = info.event.extendedProps['participantCode'];
      }
    },
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchSessions();
  }

  fetchSessions(): void {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    this.http.get(`/api/v1/sessions?dateStart=${startDate.toISOString()}&dateEnd=${endDate.toISOString()}`)
      .subscribe((response: any) => {
        this.calendarOptions.events = response.map((session: any) => ({
          title: `Session #${session.number} with ${session.participantCode}`,
          start: session.startDate,
          end: session.endDate,
          backgroundColor: this.getSessionColor(session.status),
          borderColor: this.getSessionColor(session.status),
          extendedProps: {
            participantCode: session.participantCode,
          },
        }));
      }, (error: any) => {
        console.error('Failed to load sessions:', error);
      });
  }

  getSessionColor(status: string): string {
    switch (status) {
      case 'past':
        return '#4d6b7e';
      case 'overdue':
        return '#e87b10';
      case 'scheduled':
        return '#dae032';
      default:
        return '#fff'; 
    }
  }

  handleDateChange(date: Date): void {
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    this.http.get(`/api/v1/sessions?dateStart=${startDate.toISOString()}&dateEnd=${endDate.toISOString()}`)
      .subscribe((response: any) => {
        this.calendarOptions.events = response.map((session: any) => ({
          title: `Session #${session.number} with ${session.participantCode}`,
          start: session.startDate,
          end: session.endDate,
          backgroundColor: this.getSessionColor(session.status),
          borderColor: this.getSessionColor(session.status),
          extendedProps: {
            participantCode: session.participantCode,
          },
        }));
      }, (error: any) => {
        console.error('Failed to load sessions:', error);
      });
  }
}
