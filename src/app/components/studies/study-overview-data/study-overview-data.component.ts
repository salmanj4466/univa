import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, Input, SimpleChanges, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ApiService } from '../../../api.service';

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

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.page.totalElements = this.siteLists.pagination.totalCount;
    this.rows = [...this.siteLists.data];
    this.loadingIndicator = false;
    
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

}
