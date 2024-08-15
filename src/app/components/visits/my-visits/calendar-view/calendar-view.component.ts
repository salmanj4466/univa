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
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchSessions();
  }

  fetchSessions(): void {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    this.http.get(`${environment.apiUrl}sessions?dateStart=${this.formatDateToMMDDYYYY(startDate)}&dateEnd=${this.formatDateToMMDDYYYY(endDate)}`)
      .subscribe((response: any) => {
        console.log(response.data);
        const info: any = response.data;
        this.calendarOptions.events = info.map((session: any) => ({
          title: `Session #${session?.studyMember?.user?.firstName} with ${session?.patient?.user?.firstName}`,
          start: session.scheduledAt,
          end: session.scheduledAt,
          backgroundColor: this.getSessionColor(session.status),
          borderColor: this.getSessionColor(session.status),
          extendedProps: {
            participantCode: session?.studySite?.site.name,
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

  formatDateToMMDDYYYY(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
