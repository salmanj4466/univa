import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../../api.service';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-visit-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [ApiService],
  templateUrl: './visit-list.component.html',
  styleUrls: ['./visit-list.component.scss'],
})
export class VisitListComponent implements OnInit {
  form: FormGroup;
  rescheduleForm: FormGroup;
  sessionLists: any[] = [];
  filteredSessions: any[] = [];
  totalItems = 0;
  totalPages = 0;
  currentPage = 1;
  pageSize = 10;
  studyLists: any[] = [];
  siteLists: any[] = [];
  participantLists: any[] = [];
  selectedVisit: any = null; // Ensure it's initialized properly

  constructor(private fb: FormBuilder, private toastr: ToastrService, private api: ApiService) {
    this.form = this.fb.group({
      study: [''],
      site: [''],
      participant: [''],
      startDate: [''],
      endDate: [''],
    });

    this.rescheduleForm = this.fb.group({
      date: [''],
      study: [''],
      site: [''],
      participant: [''],
    });
  }

  ngOnInit(): void {
    this.loadSessions();
    this.loadDropdownData();
  }

  loadSessions(page: number = this.currentPage, size: number = this.pageSize): void {
    const filters = this.form.value;
    this.api.getSessions(page, size, filters).pipe(
      catchError((error) => {
        console.error('Error fetching session data:', error);
        this.toastr.error('Failed to load sessions. Please try again.', 'Error');
        return of({ data: [], total: 0 });
      }),
      switchMap((res: any) => {
        this.totalItems = res?.total || 0;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.sessionLists = res?.data || [];
        this.filteredSessions = [...this.sessionLists];
        return of(this.sessionLists);
      })
    ).subscribe();
  }

  loadDropdownData(): void {
    this.api.getStudies().pipe(
      catchError((error) => {
        console.error('Error fetching studies:', error);
        this.toastr.error('Failed to load studies. Please try again.', 'Error');
        return of([]);
      })
    ).subscribe(data => this.studyLists = data);

    this.api.getSites().pipe(
      catchError((error) => {
        console.error('Error fetching sites:', error);
        this.toastr.error('Failed to load sites. Please try again.', 'Error');
        return of([]);
      })
    ).subscribe(data => this.siteLists = data);

    this.api.getParticipants().pipe(
      catchError((error) => {
        console.error('Error fetching participants:', error);
        this.toastr.error('Failed to load participants. Please try again.', 'Error');
        return of([]);
      })
    ).subscribe(data => this.participantLists = data);
  }

  onSubmit(): void {
    this.loadSessions();
  }

  onReset(): void {
    this.form.reset();
    this.loadSessions();
  }

  onPageChange(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadSessions(page);
    }
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Overdue':
        return 'text-danger';
      case 'Completed':
        return 'text-success';
      case 'Scheduled':
        return 'text-primary';
      default:
        return '';
    }
  }

  canViewDetails(item: any): boolean {
    return item?.status === 'Overdue' || item?.status === 'Completed' || (item?.status === 'Scheduled' && new Date(item.scheduledAt).toDateString() === new Date().toDateString());
  }

  canRemove(item: any): boolean {
    return new Date(item.scheduledAt) > new Date();
  }

  openRescheduleForm(item: any): void {
    this.selectedVisit = item;
    this.rescheduleForm.patchValue({
      date: item?.scheduledAt,
      study: item?.studyParticipant?.studySite?.study?.name,
      site: item?.studyParticipant?.studySite?.site?.name,
      participant: item?.studyParticipant?.participantCode,
    });
  }

  prepareForCancellation(item: any): void {
    this.selectedVisit = item;
  }

  confirmCancellation(): void {
    if (this.selectedVisit) {
      this.api.deleteSession(this.selectedVisit.id).pipe(
        catchError((error) => {
          console.error('Error cancelling visit:', error);
          this.toastr.error('Failed to cancel visit. Please try again.', 'Error');
          return of(null);
        })
      ).subscribe(() => {
        this.toastr.success('Visit cancelled successfully', 'Success');
        this.loadSessions();
      });
    }
  }

  confirmReschedule(): void {
    if (this.selectedVisit) {
      const updatedVisit = {
        ...this.selectedVisit,
        ...this.rescheduleForm.value
      };

      this.api.updateSession(this.selectedVisit.id, updatedVisit).pipe(
        catchError((error) => {
          console.error('Error rescheduling visit:', error);
          this.toastr.error('Failed to reschedule visit. Please try again.', 'Error');
          return of(null);
        })
      ).subscribe(() => {
        this.toastr.success('Visit rescheduled successfully', 'Success');
        this.loadSessions();
      });
    }
  }
}
