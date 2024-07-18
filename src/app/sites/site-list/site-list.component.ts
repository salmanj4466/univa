import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ApiService } from '../../api.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-site-list',
  standalone: true,
  imports:[CommonModule, NgxDatatableModule, HttpClientModule,RouterLink],
  providers:[ApiService],
  templateUrl: './site-list.component.html',
  styleUrl: './site-list.component.scss',
})
export class SiteListComponent implements OnInit {
  rows = [];
  columns = [{ prop: 'name', name: 'Site Name' }, { prop: 'studyShortCode:', name: 'Study short code' }, { prop: 'participantsRecruited:', name: 'Participant Recruited' }];
  page = {
    totalElements: 0,
    pageNumber: 0,
    size: 1
  };
  loadingIndicator = false;
  constructor(private api: ApiService ) {}
  ngOnInit(): void {
    this.fetchSiteList();

  }

  fetchSiteList(){
    this.loadingIndicator = true;
    this.api.siteListing({sort: 'id', start:this.page.pageNumber, size:  this.page.size}).subscribe(
      (res: any) => {
        this.page.totalElements = res.pagination.totalCount;
        this.rows = [...res.data];
        this.loadingIndicator = false;
      },
      error => {
        console.error('Sign in error:', error);
        this.loadingIndicator = false;
      }
    ); 
  }

  setPage(e: any){
    this.page.pageNumber = e.offset;
    this.fetchSiteList();
  }
}
