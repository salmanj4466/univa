import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-study-list',
  standalone: true,
  imports:[CommonModule, NgxDatatableModule, HttpClientModule,RouterLink],
  providers:[ApiService],
  templateUrl: './study-list.component.html',
  styleUrl: './study-list.component.scss',
})
export class StudyListComponent {
  rows = [];
  page = {
    totalElements: 0,
    pageNumber: 0,
    size: 1,
    offset:0
  };
  loadingIndicator = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.setPage({ offset: 0 });
  }

  fetchSiteList() {
    this.loadingIndicator = true;
    this.api.studyListing({ sort: 'id', start: this.page.pageNumber, size: this.page.size }).subscribe(
      (res: any) => {

        this.page.totalElements = res.pagination.totalCount;
        this.rows = [...res.data];
        this.loadingIndicator = false;
      },
      error => {
        console.error('Error fetching data:', error);
        this.loadingIndicator = false;
      }
    );
  }

  setPage(pageInfo: any) {
    this.page.pageNumber = pageInfo.offset;
    this.fetchSiteList();
  }
}
