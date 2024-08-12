import { Component, inject, OnInit } from '@angular/core';
import { AddNewStudyComponent } from '../add-new-study/add-new-study.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { ApiService } from '../../api.service';
import { ConfirmationComponent } from '../../components/studies/confirmation/confirmation.component';
import { DataCollectionComponent } from '../../components/studies/data-collection/data-collection.component';
import { InformedConsentFormComponent } from '../../components/studies/informed-consent-form/informed-consent-form.component';
import { ScreeningQuestionnaireComponent } from '../../components/studies/screening-questionnaire/screening-questionnaire.component';
import { StudyInformationComponent } from '../../components/studies/study-information/study-information.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editstudy',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    StudyInformationComponent,
    DataCollectionComponent,
    InformedConsentFormComponent,
    ConfirmationComponent,
    ScreeningQuestionnaireComponent,
    HttpClientModule
  ],
  providers: [ApiService],
  templateUrl: './editstudy.component.html',
  styleUrl: './editstudy.component.scss'
})
export class EditstudyComponent extends AddNewStudyComponent implements OnInit {
  activeRoute = inject(ActivatedRoute);
  studyId!: any;
  informationOfObject: any = {};
  ngOnInit(): void {
    this.studyId = this.activeRoute.snapshot.params['id'] ? Number(this.activeRoute.snapshot.params['id']) : null;
  }


  ngAfterViewInit(): void {

    if (this.studyId) {
      this.api.getStudyById(this.studyId).subscribe(res => {
        console.log(res);
        this.informationOfObject = res;
        this.StudyInformationComponent.studyInformationForm.patchValue({ ...res.data, startDate: this.formatDateToMMDDYYYY(new Date(res.data.startDate)), plannedEndDate: this.formatDateToMMDDYYYY(new Date(res.data.plannedEndDate)), studyTeamMembers: res.data.studyTeamMembers.map(t => t.user.id)[0] });
        console.log(this.StudyInformationComponent.studyInformationForm.value);
      });
    }

    setTimeout(() => {
      this.informationOfObject.data.studyMeasurements.filter(fl => fl.measurement.type == "In-app").forEach(d => {
        this.DataCollectionComponent.inAppLists.find(f => f.id == d.measurement.id)['checkbox'] = true;
      });
      this.informationOfObject.data.studyMeasurements.filter(fl => fl.measurement.type == "On-site").forEach(d => {
        this.DataCollectionComponent.onsiteLists.find(f => f.id == d.measurement.id)['checkbox'] = true;
      });
      this.DataCollectionComponent.videodiarytopicsObject = this.informationOfObject.data.studyVideoDiaryTopics.map(d => {
        return d = {
          topicId: `${d.videoDiaryTopic.id}-${d.videoDiaryTopic.name}`,
          durationSecs: d.duration
        }
      });
    }, 2000);

  }

  screeingInfo() {
    this.informationOfObject.data.studyMeasurements.filter(fl => fl.measurement.type == "In-app").forEach(d => {
      this.DataCollectionComponent.inAppLists.find(f => f.id == d.measurement.id)['checkbox'] = true;
    });
    this.informationOfObject.data.studyMeasurements.filter(fl => fl.measurement.type == "On-site").forEach(d => {
      this.DataCollectionComponent.onsiteLists.find(f => f.id == d.measurement.id)['checkbox'] = true;
    });
    this.DataCollectionComponent.videodiarytopicsObject = this.informationOfObject.data.studyVideoDiaryTopics.map(d => {
      return d = {
        topicId: `${d.videoDiaryTopic.id}-${d.videoDiaryTopic.name}`,
        durationSecs: d.duration
      }
    });
    console.log(this.DataCollectionComponent.videodiarytopicsObject);
  }


  override onSubmit() {
    this.api.putStudy({
      "name": this.StudyInformationComponent.studyInformationForm.value.name,
      "description": this.StudyInformationComponent.studyInformationForm.value.description,
      "shortCode": this.StudyInformationComponent.studyInformationForm.value.shortCode,
      "startDate": this.StudyInformationComponent.studyInformationForm.value.startDate,
      "plannedEndDate": this.StudyInformationComponent.studyInformationForm.value.plannedEndDate,
      "plannedNumberOfParticipants": Number(this.StudyInformationComponent.studyInformationForm.value.plannedNumberOfParticipants),
      "durationInWeeksPerParticipant": Number(this.StudyInformationComponent.studyInformationForm.value.durationInWeeksPerParticipant),
      "icfParticipant": this.InformedConsentFormComponent.icfParticipant,
      "icfCarer": this.InformedConsentFormComponent.icfCarer,
      "icfStudyManager": this.InformedConsentFormComponent.icfStudyManager,
      "studyTeamMembers": [Number(this.StudyInformationComponent.studyInformationForm.value.studyTeamMembers)],
      "studyMeasurements": [
        ...this.inAppLists.map(e => {
          return e = {
            id: e.id,
            active: e.checkbox
          }
        }),
        ...this.onsiteLists.map(e => {
          return e = {
            id: e.id,
            active: e.checkbox
          }
        })
      ],
      "studyVideoDiaryTopics": [

        ...this.DataCollectionComponent.videodiarytopicsObject.map(e => {
          return e = {
            "id": Number(e.topicId.split('-')[0]),
            "duration": Number(e.durationSecs)
          }
        }),
      ],
      "studySurveys": [
        {
          "id": 2,
          "active": true
        }
      ],
      "studyWearables": [
        {
          "id": 2,
          "active": false
        }
      ],
      "icfClauses": [
        ...this.InformedConsentFormComponent?.participantList,
        ...this.InformedConsentFormComponent?.carerList,
        ...this.InformedConsentFormComponent?.studyManagerList
      ]
    }, this.studyId).subscribe(res => {
      console.log(res);
      if (res && res.data) {
        this.router.navigate(['/study-list']);
        console.log('Sign in successful');
        this.toastr.success(res?.message, ' ');
      } else {
        this.toastr.error(res.error, ' ');
      }
    }, err => {
      this.toastr.error(err.error.error, ' ');
    });
  }


  formatDateToMMDDYYYY(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }



}
