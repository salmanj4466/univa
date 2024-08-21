import { Component } from "@angular/core";

import { StudyInformationComponent } from "../../components/studies/study-information/study-information.component";
import { DataCollectionComponent } from "../../components/studies/data-collection/data-collection.component";
import { InformedConsentFormComponent } from "../../components/studies/informed-consent-form/informed-consent-form.component";
import { StudyOverviewDataComponent } from "../../components/studies/study-overview-data/study-overview-data.component";
import { ScreeningQuestionnaireComponent } from "../../components/studies/screening-questionnaire/screening-questionnaire.component";

@Component({
  selector: "app-study-overview",
  standalone: true,
  imports: [
    StudyInformationComponent,
    DataCollectionComponent,
    InformedConsentFormComponent,
    StudyOverviewDataComponent,
    ScreeningQuestionnaireComponent,
  ],
  templateUrl: "./study-overview.component.html",
  styleUrl: "./study-overview.component.scss",
})
export class StudyOverviewComponent {}
