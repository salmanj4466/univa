import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
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
export class SiteListComponent implements OnInit, AfterViewInit {
  rows = [];
  columns = [{ prop: 'name', name: 'Site Name' }, { prop: 'studyShortCode:', name: 'Study short code' }, { prop: 'participantsRecruited:', name: 'Participant Recruited' }];
  page = {
    totalElements: 0,
    pageNumber: 0,
    size: 10
  };
  loadingIndicator = false;
  @ViewChild('datatable') datatable: ElementRef;
  constructor(private api: ApiService ) {}
  ngAfterViewInit(): void {
    // if (this.datatable && this.datatable.nativeElement) {
    //   const rect = this.datatable.nativeElement.getBoundingClientRect();
    //   console.log('Datatable bounding rect:', rect);
    // } else {
    //   console.error('Datatable element not found or not yet initialized.');
    // }
    this.setPage({ offset: 0 });
  }
  ngOnInit(): void {}

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
