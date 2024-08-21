import { Component, inject } from "@angular/core";

import { StudyInformationComponent } from "../../components/studies/study-information/study-information.component";
import { DataCollectionComponent } from "../../components/studies/data-collection/data-collection.component";
import { InformedConsentFormComponent } from "../../components/studies/informed-consent-form/informed-consent-form.component";
import { StudyOverviewDataComponent } from "../../components/studies/study-overview-data/study-overview-data.component";
import { ScreeningQuestionnaireComponent } from "../../components/studies/screening-questionnaire/screening-questionnaire.component";
import { HttpClientModule } from "@angular/common/http";
import { ApiService } from "../../api.service";
import { FormBuilder } from "@angular/forms";
import { Router } from "express";
import { ToastrService } from "ngx-toastr";
import { AddNewStudyComponent } from "../add-new-study/add-new-study.component";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-study-overview",
  standalone: true,
  imports: [
    StudyInformationComponent,
    DataCollectionComponent,
    InformedConsentFormComponent,
    StudyOverviewDataComponent,
    ScreeningQuestionnaireComponent,
    HttpClientModule
  ],
  providers: [ApiService],
  templateUrl: "./study-overview.component.html",
  styleUrl: "./study-overview.component.scss",
})
export class StudyOverviewComponent extends AddNewStudyComponent {

  activeRoute = inject(ActivatedRoute);
  studyId!: any;
  informationOfObject: any = {};
  siteLists: any[] = [];
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
      this.api.getStudySiteById(this.studyId).subscribe(res => {
        console.log(res);
        this.siteLists = res;

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

  studyUpdate() {
    if (this.StudyInformationComponent.studyInformationForm.valid) {
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
      }, this.studyId).subscribe(res => {
        console.log(res);
        if (res && res.data) {

          this.toastr.success(res?.message, ' ');
        } else {
          this.toastr.error(res.error, ' ');
        }
      }, err => {
        this.toastr.error(err.error.error, ' ');
      });
    } else {
      this.toastr.error("Please try again");
      this.StudyInformationComponent.errorMessage = true;
    }
  }

  screeningUpdate() {
    if (this.ScreeningQuestionnaireComponent.screenings && this.ScreeningQuestionnaireComponent.demographics) {
      this.api.postForms({
        "screenings": [Number(this.ScreeningQuestionnaireComponent.screenings)],
        "demographics": [Number(this.ScreeningQuestionnaireComponent.demographics)],
      }, this.studyId).subscribe(res => {
        console.log(res);
        if (res && res.data) {

          this.toastr.success(res?.message, ' ');
        } else {
          this.toastr.error(res.error, ' ');
        }
      }, err => {
        this.toastr.error(err.error.error, ' ');
      });
    } else {
      this.toastr.error("Please try again");
      this.StudyInformationComponent.errorMessage = true;
    }
  }

  consentUpdate() {

    if (!this.InformedConsentFormComponent.icfCarer || this.InformedConsentFormComponent.participantList.length == 0
      || this.InformedConsentFormComponent.participantList.length == 0
      || this.InformedConsentFormComponent.carerList.length == 0
      || !this.InformedConsentFormComponent.icfParticipant
      || !this.InformedConsentFormComponent.icfStudyManager) {
      this.InformedConsentFormComponent.errorMessage = true;
      this.toastr.error('Please provide a value for all the required fields');
    } else {
      this.api.putStudy({
        "icfClauses": [
          ...this.InformedConsentFormComponent?.participantList,
          ...this.InformedConsentFormComponent?.carerList,
          ...this.InformedConsentFormComponent?.studyManagerList
        ]
      }, this.studyId).subscribe(res => {
        console.log(res);
        if (res && res.data) {

          this.toastr.success(res?.message, ' ');
        } else {
          this.toastr.error(res.error, ' ');
        }
      }, err => {
        this.toastr.error(err.error.error, ' ');
      });
    }

  }




}
