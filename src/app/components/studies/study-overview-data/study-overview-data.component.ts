import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, Input, SimpleChanges, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ApiService } from '../../../api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-study-overview-data',
  standalone: true,
  imports: [CommonModule, NgxDatatableModule, RouterLink],
  providers: [ApiService],
  templateUrl: './study-overview-data.component.html',
  styleUrl: './study-overview-data.component.scss'
})
export class StudyOverviewDataComponent {
  api = inject(ApiService);
  @Input() siteLists: any = {};
  @Input() studyId: any;

  rows = [];
  page = {
    totalElements: 0,
    pageNumber: 0,
    size: 10,
    offset: 0,
  };
  loadingIndicator = false;
  @ViewChild("datatable") datatable: ElementRef;
  percentage = 0;
  percentageSyle = '0%';
  @Input() informationOfObject: any;
  constructor(public router: Router,
    public toastr: ToastrService) {

  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    if(this.informationOfObject){
      const num: any = (this.informationOfObject.data.currentNumberOfParticipants / this.informationOfObject.data.plannedNumberOfParticipants) * 100; 
      this.percentageSyle = `${Number(num).toFixed(2)}%`;
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

    this.page.totalElements = this.siteLists.pagination.totalCount;
    this.rows = [...this.siteLists.data];
    this.loadingIndicator = false;

    if(this.informationOfObject){
      const num: any = (this.informationOfObject.data.currentNumberOfParticipants / this.informationOfObject.data.plannedNumberOfParticipants) * 100; 
      this.percentageSyle = `${Number(num).toFixed(2)}%`;
    }

  }
  setPage(pageInfo: any) {
    this.page.pageNumber = pageInfo.offset;
    this.fetchSiteList();
  }

  fetchSiteList() {
    this.api.getStudySiteByIdQueryparm(
      {
        sort: "id",
        start: this.page.pageNumber,
        size: this.page.size,
        study: this.studyId,
      }
    ).subscribe(res => {
      console.log(res);
      this.siteLists = res;
      this.page.totalElements = this.siteLists.pagination.totalCount;
      this.rows = [...this.siteLists.data];
      this.loadingIndicator = false;

    });
  }

  deleteStudy() {
    this.api.deleteStudyById(this.studyId).subscribe(res => {
      if (res && res.data) {
        this.router.navigate(['/study-list']);
        this.toastr.success('Study information is deleted successfully');
      } else {
        this.toastr.error(res.error, 'Error');
      }
    }, err => {
      this.toastr.error(err.error.error, 'Error');
    });

  }

}
