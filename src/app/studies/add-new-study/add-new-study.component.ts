import { Component, ViewChild } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatStepperModule } from "@angular/material/stepper";
import { MatButtonModule } from "@angular/material/button";
import { StudyInformationComponent } from "../../components/studies/study-information/study-information.component";
import { DataCollectionComponent } from "../../components/studies/data-collection/data-collection.component";
import { InformedConsentFormComponent } from "../../components/studies/informed-consent-form/informed-consent-form.component";
import { ConfirmationComponent } from "../../components/studies/confirmation/confirmation.component";
import { ScreeningQuestionnaireComponent } from "../../components/studies/screening-questionnaire/screening-questionnaire.component";
import { HttpClientModule } from "@angular/common/http";
import { ApiService } from "../../api.service";

@Component({
  selector: "app-add-new-study",
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
  templateUrl: "./add-new-study.component.html",
  styleUrl: "./add-new-study.component.scss",
})
export class AddNewStudyComponent {


  @ViewChild(StudyInformationComponent)
  public StudyInformationComponent!: StudyInformationComponent;

  @ViewChild(DataCollectionComponent)
  public DataCollectionComponent!: DataCollectionComponent;

  @ViewChild(InformedConsentFormComponent)
  public InformedConsentFormComponent!: InformedConsentFormComponent;


  firstFormGroup = this._formBuilder.group({
    firstCtrl: ["", Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ["", Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    secondCtrl: ["", Validators.required],
  });

  fourFormGroup = this._formBuilder.group({
    secondCtrl: ["", Validators.required],
  });

  fiveFormGroup = this._formBuilder.group({
    secondCtrl: ["", Validators.required],
  });

  isLinear = false;
  inAppLists: any[] = [];
  onsiteLists: any[] = [];
  constructor(private _formBuilder: FormBuilder, public api: ApiService) { }

  nextStep1() {
    console.log(this.StudyInformationComponent.studyInformationForm.value);
  }

  screeningQuestionnairNext() {
    this.inAppLists = this.DataCollectionComponent?.inAppLists.filter(e => e.checkbox == true);
    this.onsiteLists = this.DataCollectionComponent?.onsiteLists.filter(e => e.checkbox == true);
  }

  onSubmit() {
    this.api.postStudy({
      "name": this.StudyInformationComponent.studyInformationForm.value.name,
      "description":  this.StudyInformationComponent.studyInformationForm.value.description,
      "shortCode":  this.StudyInformationComponent.studyInformationForm.value.shortCode,
      "startDate":  this.StudyInformationComponent.studyInformationForm.value.startDate,
      "plannedEndDate":  this.StudyInformationComponent.studyInformationForm.value.plannedEndDate,
      "plannedNumberOfParticipants":  this.StudyInformationComponent.studyInformationForm.value.plannedNumberOfParticipants,
      "durationInWeeksPerParticipant":  this.StudyInformationComponent.studyInformationForm.value.durationInWeeksPerParticipant,
      "icfParticipant":  this.StudyInformationComponent.studyInformationForm.value.icfParticipant,
      "icfCarer":  this.StudyInformationComponent.studyInformationForm.value.icfCarer,
      "icfStudyManager":  this.StudyInformationComponent.studyInformationForm.value.icfStudyManager,
      "studyTeamMembers": [1, 3, 5],
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
            "id": e.split('-')[0],
            "duration": e.durationSecs
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
    }).subscribe(res => {
      console.log(res);
    });
  }
}
