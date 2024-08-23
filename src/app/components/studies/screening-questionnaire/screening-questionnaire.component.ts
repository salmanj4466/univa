import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { Component, Input } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { ApiService } from "../../../api.service";

@Component({
  selector: "app-screening-questionnaire",
  standalone: true,
  imports: [NgbTooltipModule, ReactiveFormsModule, HttpClientModule, CommonModule, FormsModule],
  providers: [ApiService,],
  templateUrl: "./screening-questionnaire.component.html",
  styleUrl: "./screening-questionnaire.component.scss",
})
export class ScreeningQuestionnaireComponent {
  screenings:any;
  demographics: any;
  screeningLists: any[] = [];
  demographicsLists: any[] = [];
  @Input() studyId :any;
  constructor(private authService: ApiService) {
    this.authService.getScreenings().subscribe(res => {
      this.screeningLists = res?.data;
    });
    this.authService.getdemographics().subscribe(res => {
      this.demographicsLists = res?.data;
    });
    
  }
  
  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.authService.getForms(this.studyId).subscribe(res => {
      console.log(res);
      this.screenings = res?.data.filter(f => f.type =='screenings')[0]?.form?.id;
      this.demographics = res?.data.filter(f => f.type =='demographics')[0]?.form?.id;
    });
  }
}

