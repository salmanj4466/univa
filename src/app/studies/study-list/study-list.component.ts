import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { ApiService } from "../../api.service";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";

@Component({
  selector: "app-study-list",
  standalone: true,
  imports: [CommonModule, NgxDatatableModule, HttpClientModule, RouterLink],
  providers: [ApiService],
  templateUrl: "./study-list.component.html",
  styleUrl: "./study-list.component.scss",
})
export class StudyListComponent implements OnInit, AfterViewInit {
  rows = [];
  page = {
    totalElements: 0,
    pageNumber: 0,
    size: 10,
    offset: 0,
  };
  loadingIndicator = false;
  @ViewChild("datatable") datatable: ElementRef;

  constructor(private api: ApiService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // if (this.datatable && this.datatable.nativeElement) {
    //   const rect = this.datatable.nativeElement.getBoundingClientRect();
    //   console.log('Datatable bounding rect:', rect);
    // } else {
    //   console.error('Datatable element not found or not yet initialized.');
    // }
    this.setPage({ offset: 0 });
  }

  fetchSiteList() {
    this.loadingIndicator = true;
    this.api
      .studyListing({
        sort: "id",
        start: this.page.pageNumber,
        size: this.page.size,
      })
      .subscribe(
        (res: any) => {
          this.page.totalElements = res.pagination.totalCount;
          this.rows = [...res.data];
          this.loadingIndicator = false;
        },
        (error) => {
          console.error("Error fetching data:", error);
          this.loadingIndicator = false;
        }
      );
  }

  setPage(pageInfo: any) {
    this.page.pageNumber = pageInfo.offset;
    this.fetchSiteList();
  }
}
