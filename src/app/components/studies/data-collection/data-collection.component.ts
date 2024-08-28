import { HttpClientModule } from '@angular/common/http';
import { Component, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-collection',
  standalone: true,
  imports: [NgbTooltipModule, FormsModule, RouterLink],
  providers: [ApiService],
  templateUrl: './data-collection.component.html',
  styleUrl: './data-collection.component.scss',
})
export class DataCollectionComponent {
  onsiteLists: any[] = [];
  inAppLists: any[] = [];
  videodiarytopicsList: any[] = [];
  topicId!: number;
  durationSecs!: number;
  videodiarytopicsObject: any[] = [{
    topicId: '',
    durationSecs: ''
  }];
  measurementsDropdownlists: any[] = [];
  videoDiaryDisabled = false;
  constructor(private api: ApiService) {
    this.fetchMeasurementsList();
    this.getvideodiarytopics();
    this.api.getmeasurements().subscribe(res => {
      this.measurementsDropdownlists = res?.data;
    });

  }

  ngOnChanges(changes: SimpleChanges): void {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
    debugger;
    this.videoDiaryDisabled = this.inAppLists.filter((e: any) => e.name == 'Video diary')[0]?.checkbox;
  }

  fetchMeasurementsList() {

    this.api.measurements({ sort: 'id', start: 0, size: 1000 }).subscribe(
      (res: any) => {
        console.log(res);
        if (this.onsiteLists.length == 0) {
          this.onsiteLists = res.data.filter(f => f['type'] == "On-site").map(d => {
            return d = {
              ...d,
              checkbox: false
            }
          });
        }
        if (this.inAppLists.length == 0) {
          this.inAppLists = res.data.filter(f => f['type'] == "In-app").map(d => {
            return d = {
              ...d,
              checkbox: false
            }
          });
        }
        console.log(this.onsiteLists);
      },
      error => {

      }
    );
  }



  getvideodiarytopics() {
    this.api.getvideodiarytopics({ sort: 'id', start: 0, size: 1000 }).subscribe(
      (res: any) => {
        this.videodiarytopicsList = res?.data;

      },
      error => {

      }
    );
  }

  add() {
    this.videodiarytopicsObject.push({
      topicId: '',
      durationSecs: ''
    });
  }

  remove(i: any) {
    this.videodiarytopicsObject.splice(i, 1);
  }

  dairyChange(){
    this.videoDiaryDisabled = this.inAppLists.filter((e: any) => e.name == 'Video diary')[0]?.checkbox;
  }
}
