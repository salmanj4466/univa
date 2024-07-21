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
  ],
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

  constructor(private _formBuilder: FormBuilder) {}

  nextStep1(){
    console.log(this.StudyInformationComponent.studyInformationForm.value);
  }

  screeningQuestionnairNext(){

  }
}
