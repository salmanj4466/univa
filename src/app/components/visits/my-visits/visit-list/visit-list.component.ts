import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment.development';
@Component({
  selector: 'app-visit-list',
  standalone: true,
  templateUrl: './visit-list.component.html',
  styleUrls: ['./visit-list.component.scss'],
})
export class VisitListComponent implements OnInit {
  visits: any[] = [];
  displayedVisits: any[] = [];
  currentPage: number = 1;
  pageSize: number = 5;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadVisits();
  }

  loadVisits(): void {
    this.http.get<any[]>(`${environment.apiUrl}/visits`).subscribe(
      (data) => {
        this.visits = data;
        this.updateDisplayedVisits();
      },
      (error) => {
        console.error('Failed to load visits:', error);
      }
    );
  }

  updateDisplayedVisits(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.displayedVisits = this.visits.slice(start, end);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updateDisplayedVisits();
  }
}
