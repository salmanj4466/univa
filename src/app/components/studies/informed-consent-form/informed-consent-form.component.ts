import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-informed-consent-form',
  standalone: true,
  imports: [NgbTooltipModule,  FormsModule, RouterLink],
  providers: [ApiService],
  templateUrl: './informed-consent-form.component.html',
  styleUrl: './informed-consent-form.component.scss',
})
export class InformedConsentFormComponent {
  title = 'angular';
  icfParticipant!: any;
  icfCarer!: any;
  icfStudyManager!: any;
  participantList: any[] =[
    {
      type: "Participant",
      description: ""
    }
  ]

  carerList: any[] =[
    {
      type: "Carer",
      description: ""
    }
  ]

  studyManagerList: any[] =[
    {
      type: "Study Manager",
      description: ""
    }
  ]

  constructor(private api: ApiService) {}

  addParticipant(){
  
    this.participantList.push({
      type: "Participant",
      description: ""
    })
  }

  addCarer(){
   
    this.carerList.push({
      type: "Carer",
      description: ""
    })
  }

  addStudyManager(){
    this.studyManagerList.push({
      type: "Study Manager",
      description: ""
    })
  }

  removeParticipant(index: any){
  
    this.participantList.splice(index,1);
 
  }

  removestudy(index: any){
  
    this.studyManagerList.splice(index,1);
 
  }

  removeCarer(index: any){
  
    this.carerList.splice(index,1);
 
  }
}
