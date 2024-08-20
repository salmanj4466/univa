import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../api.service';
import { VisitListComponent } from '../../components/visits/my-visits/visit-list/visit-list.component';
import { CalendarViewComponent } from '../../components/visits/my-visits/calendar-view/calendar-view.component';

@Component({
  selector: 'app-my-visits',
  standalone: true,
  imports: [VisitListComponent, ReactiveFormsModule, CalendarViewComponent],
  providers: [ApiService],
  templateUrl: './my-visits.component.html',
  styleUrls: ['./my-visits.component.scss'],
})
export class MyVisitsComponent implements OnInit {
  form = this.fb.group({
    studyMember: ['', Validators.required],
    site: ['', Validators.required],
    participant: ['', Validators.required],
    scheduledAt: ['', Validators.required],
  });

  studyLists: any[] = [];
  siteLists: any[] = [];
  participantLists: any[] = [];

  constructor(private fb: FormBuilder, private api: ApiService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadStudyLists();
    this.loadSiteLists();
    this.loadParticipantLists();
  }

  loadStudyLists(): void {
    this.api.getStudies().subscribe(
      (res: any) => {
        this.studyLists = res?.data || [];
      },
      (error) => {
        console.error('Error fetching study data:', error);
      }
    );
  }

  loadSiteLists(): void {
    this.api.getSites().subscribe(
      (res: any) => {
        this.siteLists = res?.data || [];
      },
      (error) => {
        console.error('Error fetching site data:', error);
      }
    );
  }

  loadParticipantLists(): void {
    this.api.getParticipants().subscribe(
      (res: any) => {
        this.participantLists = res?.data || [];
      },
      (error) => {
        console.error('Error fetching participant data:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.form.valid) {
      const sessionData = {
        ...this.form.value,
        studyMember: Number(this.form.value.studyMember),
        site: Number(this.form.value.site),
        participant: Number(this.form.value.participant),
        scheduledAt: new Date(this.form.value.scheduledAt),
      };

      this.api.createSession(sessionData).subscribe(
        (res: any) => {
          if (res && res.data) {
            this.toastr.success(res.message, ' ');
            document.getElementById('close')?.click();
          } else {
            this.toastr.error(res.error, ' ');
          }
        },
        (err) => {
          this.toastr.error(err.error.error, ' ');
        }
      );
    }
  }
}
