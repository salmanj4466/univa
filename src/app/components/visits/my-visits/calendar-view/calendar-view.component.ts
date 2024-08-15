import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment.development';

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
    datesSet: (datesInfo) => this.handleDateChange(datesInfo),
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    this.fetchSessions(startDate, endDate);
  }

  fetchSessions(startDate: Date, endDate: Date): void {
    const formattedStartDate = this.formatDateToYYYYMMDD(startDate);
    const formattedEndDate = this.formatDateToYYYYMMDD(endDate);

    this.http.get(`${environment.apiUrl}sessions?dateStart=${formattedStartDate}&dateEnd=${formattedEndDate}`)
      .subscribe(
        (response: any) => {
          console.log('API response:', response); 
          const sessions = Array.isArray(response) ? response : response.sessions || [];
          this.calendarOptions.events = sessions.map((session: any) => ({
            title: `Session #${session.number} with ${session.participantCode}`,
            start: session.startDate,
            end: session.endDate,
            backgroundColor: this.getSessionColor(session.status),
            borderColor: this.getSessionColor(session.status),
            extendedProps: {
              participantCode: session.participantCode,
            },
          }));
        },
        (error: any) => {
          console.error('Failed to load sessions:', error);
        }
      );
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
        return '#ffffff'; 
    }
  }

  handleDateChange(arg: { start: Date, end: Date }): void {
    this.fetchSessions(arg.start, arg.end);
  }

  formatDateToYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
