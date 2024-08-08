import { Component, inject, ViewChild } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatStepper, MatStepperModule } from "@angular/material/stepper";
import { MatButtonModule } from "@angular/material/button";
import { StudyInformationComponent } from "../../components/studies/study-information/study-information.component";
import { DataCollectionComponent } from "../../components/studies/data-collection/data-collection.component";
import { InformedConsentFormComponent } from "../../components/studies/informed-consent-form/informed-consent-form.component";
import { ConfirmationComponent } from "../../components/studies/confirmation/confirmation.component";
import { ScreeningQuestionnaireComponent } from "../../components/studies/screening-questionnaire/screening-questionnaire.component";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { ApiService } from "../../api.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

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
  http = inject(HttpClient);

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

  @ViewChild('stepper') stepper: MatStepper;
  constructor(private _formBuilder: FormBuilder,
    private router: Router,
    public api: ApiService, public toastr: ToastrService,) { }

  nextStep1() {
    console.log(this.StudyInformationComponent.studyInformationForm.value);
    if (this.StudyInformationComponent.studyInformationForm.invalid) {
      this.StudyInformationComponent.errorMessage = true;
      this.toastr.error('Please provide a value for all the required fields');
    } else {
      this.stepper.next();
    }
  }

  consentForm() {
    if (!this.InformedConsentFormComponent.icfCarer || !this.InformedConsentFormComponent.icfParticipant || !this.InformedConsentFormComponent.icfStudyManager) {
      this.InformedConsentFormComponent.errorMessage = true;
      this.toastr.error('Please provide a value for all the required fields');
    } else {
      this.stepper.next();
    }
  }

  screeningQuestionnairNext() {
    this.inAppLists = this.DataCollectionComponent?.inAppLists.filter(e => e.checkbox == true);
    this.onsiteLists = this.DataCollectionComponent?.onsiteLists.filter(e => e.checkbox == true);
    if(this.inAppLists.length == 0 || this.onsiteLists.length == 0 ){
      this.toastr.error('Please provide a value for all the required fields');
    } else {
      this.stepper.next();
    }
  }

  onSubmit() {
    this.api.postStudy({
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
    }).subscribe(res => {
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
}
