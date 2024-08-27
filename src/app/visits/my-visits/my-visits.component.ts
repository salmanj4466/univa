import { Component, inject } from '@angular/core';
import { VisitListComponent } from '../../components/visits/my-visits/visit-list/visit-list.component';
import { CalendarViewComponent } from '../../components/visits/my-visits/calendar-view/calendar-view.component';
import { ApiService } from '../../api.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-visits',
  standalone: true,
  imports: [VisitListComponent, ReactiveFormsModule,CalendarViewComponent],
  providers: [ApiService],
  templateUrl: './my-visits.component.html',
  styleUrl: './my-visits.component.scss',
})
export class MyVisitsComponent {
  form: any;
  api = inject(ApiService);
  studyLists: any[] = [];
  siteLists: any[] = [];
  partipantLists: any[] = [];

  constructor(private fb: FormBuilder, public toastr: ToastrService) {
    this.form = this.fb.group({
      studyMember: ['', Validators.required],
      site: [''],
      participant: ['', Validators.required],
      scheduledAt: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.api
      .studyListing({
        sort: "id",
        start: 1,
        size: 1000,
      })
      .subscribe(
        (res: any) => {
          this.studyLists = res?.data;
        },
        (error) => {
          console.error("Error fetching data:", error);

        }
      );



    this.api
      .siteListing({
        sort: "id",
        start: 1,
        size: 1000,
      })
      .subscribe(
        (res: any) => {
          this.siteLists = res?.data;
        },
        (error) => {
          console.error("Error fetching data:", error);

        }
      );

    this.api
      .participants({
        sort: "id",
        start: 1,
        size: 1000,
      })
      .subscribe(
        (res: any) => {
          this.partipantLists = res?.data;
        },
        (error) => {
          console.error("Error fetching data:", error);

        }
      );

  }

  onSubmit() {
    debugger;
    if (this.form.valid) {
      // console.log('Form Submitted!', this.form.value);
      this.form.value.studyMember = Number(this.form.value.studyMember);
      this.form.value.site = Number(this.form.value.site);
      this.form.value.participant = Number(this.form.value.participant);
      this.form.value.scheduledAt = this.formatDateWithOffset(new Date(this.form.value.scheduledAt));
      this.api.postSession(this.form.value).subscribe(res => {
        console.log(res);
        if (res && res.data) {
          // this.router.navigate(['/study-list']);
          console.log('Sign in successful');
          this.toastr.success(res?.message, ' ');
          document.getElementById('close').click();
        } else {
          this.toastr.error(res.error, ' ');
        }
      }, err => {
        this.toastr.error(err.error.error, ' ');
      });
    }
  }

  formatDateWithOffset(date) {
    // Extract year, month, day, hours, minutes, and seconds
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    
    // Format the date string with the time zone offset
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}+00:00`;
}

}
