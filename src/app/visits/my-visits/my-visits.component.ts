import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { CalendarViewComponent } from '../../components/visits/my-visits/calendar-view/calendar-view.component';
import { VisitListComponent } from '../../components/visits/my-visits/visit-list/visit-list.component';

@Component({
  selector: 'app-my-visits',
  standalone: true,
  imports: [CalendarViewComponent, VisitListComponent],
  templateUrl: './my-visits.component.html',
  styleUrls: ['./my-visits.component.scss'],
})
export class MyVisitsComponent implements OnInit {
  sessions: any[] = [];
  studies: any[] = [];
  sites: any[] = [];
  participants: any[] = [];
  selectedStudy: string = '';
  selectedSite: string = '';
  selectedParticipant: string = '';
  dateStart: string = '';
  dateEnd: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchSessions();
    this.loadOptions();
  }

  fetchSessions(): void {
    const params = {
      study: this.selectedStudy,
      site: this.selectedSite,
      participant: this.selectedParticipant,
      dateStart: this.dateStart,
      dateEnd: this.dateEnd,
    };

    this.http
      .get<any[]>(`${environment.apiUrl}/sessions`, { params })
      .subscribe(
        (response) => {
          this.sessions = response; 
        },
        (error) => {
          console.error('Failed to load sessions:', error);
        }
      );
  }

  loadOptions(): void {
    this.http.get<any[]>(`${environment.apiUrl}/studies`).subscribe(
      (data) => this.studies = data,
      (error) => console.error('Failed to load studies:', error)
    );
    this.http.get<any[]>(`${environment.apiUrl}/sites`).subscribe(
      (data) => this.sites = data,
      (error) => console.error('Failed to load sites:', error)
    );
    this.http.get<any[]>(`${environment.apiUrl}/participants`).subscribe(
      (data) => this.participants = data,
      (error) => console.error('Failed to load participants:', error)
    );
  }

  openNewSessionModal(): void {
   //Not done cuz i cant get it kindly arrange this as needed  
  }
  onSubmitNewSession(form: any): void {
    if (form.valid) {
      const newSession = {
        date: form.value.date,
        study: form.value.study,
        site: form.value.site,
        participant: form.value.participant,
      };

      this.http.post(`${environment.apiUrl}/sessions`, newSession).subscribe(
        () => {
          alert('Session scheduled successfully');
          this.fetchSessions(); 
        },
        (error) => {
          console.error('Failed to schedule session:', error);
          alert('Failed to schedule session. Please try again.');
        }
      );
    }
  }
}
