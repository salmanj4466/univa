import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../../api.service';
import { environment } from '../../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-visit-list',
  standalone: true,
  imports: [ReactiveFormsModule, NgxDatatableModule],
  providers: [ApiService],
  templateUrl: './visit-list.component.html',
  styleUrl: './visit-list.component.scss'
})
export class VisitListComponent {

  form: any;
  api = inject(ApiService);
  http = inject(HttpClient);
  studyLists: any[] = [];
  siteLists: any[] = [];
  partipantLists: any[] = [];
  sessionLists: any[]=[];
  cancelId: any;
  rows = [];
  columns = [{ prop: 'name', name: 'Site Name' }, { prop: 'studyShortCode:', name: 'Study short code' }, { prop: 'participantsRecruited:', name: 'Participant Recruited' }];
  page = {
    totalElements: 0,
    pageNumber: 0,
    size: 10
  };
  constructor(private fb: FormBuilder, public toastr: ToastrService) {
    this.form = this.fb.group({
      id:[],
      studyMember: ['', Validators.required],
      // site: ['', Validators.required],
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


   this.apiCall();
  }

  apiCall(){
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    // sort: 'id', start:this.page.pageNumber, size:  this.page.size
    // const params: any = "dateStart=${this.formatDateToMMDDYYYY(startDate)}&dateEnd=${this.formatDateToMMDDYYYY(endDate)";

    const params: any = {
      sort: 'id', 
      start:this.page.pageNumber, 
      size:  this.page.size,
      dateStart: this.formatDateToMMDDYYYY(startDate),
      dateEnd: this.formatDateToMMDDYYYY(endDate)
    }
    this.http.get(`${environment.apiUrl}sessions}`, {params})
      .subscribe((response: any) => {
        console.log(response.data);
      this.sessionLists = response.data;

      }, (error: any) => {
        console.error('Failed to load sessions:', error);
      });
  }

  onSubmit() {
    if (this.form.valid) {
      // console.log('Form Submitted!', this.form.value);
      this.form.value.studyMember = Number(this.form.value.studyMember);
      this.form.value.site = Number(this.form.value.site);
      this.form.value.participant = Number(this.form.value.participant);
      this.form.value.scheduledAt = this.formatDateWithOffset(new Date(this.form.value.scheduledAt));
      this.api.editSession(this.form.value).subscribe(res => {
        console.log(res);
        if (res && res.data) {
          // this.router.navigate(['/study-list']);
          console.log('Sign in successful');
          this.toastr.success(res?.message, ' ');
          this.apiCall();
          document.getElementById('closeEdit').click();
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

  formatDateToMMDDYYYY(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
  delete(item: any){
    this.cancelId = item?.id;
  }

  yes(){
    this.api.deletesessionById(this.cancelId).subscribe(res => {
      console.log(res);
      if (res && res) {
        // this.router.navigate(['/study-list']);
        console.log('Sign in successful');
        this.toastr.success(res?.message, ' ');
        document.getElementById('cancelVisit-model').click();
        this.apiCall();
      } else {
        this.toastr.error(res.error, ' ');
      }
    }, err => {
      this.toastr.error(err.error.error, ' ');
    });
  }

  edit(item: any){
    this.form.patchValue({
      id: item.id,
      studyMember: item?.studyMember?.id,
      // site: ['', Validators.required],
      participant: item?.studyParticipant?.id,
      scheduledAt: this.formatDateToMMDDYYYY(new Date(item?.scheduledAt))
    });
    console.log(this.form.value);
  }


  deletession(){
    this.api.deletesessionById(this.form.value.id).subscribe(res => {
      console.log(res);
      if (res && res) {
        // this.router.navigate(['/study-list']);
        console.log('Sign in successful');
        this.toastr.success(res?.message, ' ');
        document.getElementById('closeEdit').click();
        this.apiCall();
      } else {
        this.toastr.error(res.error, ' ');
      }
    }, err => {
      this.toastr.error(err.error.error, ' ');
    });
  }

  setPage(e: any){
    this.page.pageNumber = e.offset;
    this.apiCall();
  }

}
