import { HttpClientModule } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { ApiService } from "../../../api.service";
import { Router } from "express";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-study-information",
  standalone: true,
  imports: [NgbTooltipModule, ReactiveFormsModule, HttpClientModule, CommonModule],
  providers: [ApiService,],
  templateUrl: "./study-information.component.html",
  styleUrl: "./study-information.component.scss",
})
export class StudyInformationComponent {
  studyInformationForm!: FormGroup;
  errorMessage = false;
  teamMembersdata: any[] = [];
  readOnlyduration = true;
  constructor(private fb: FormBuilder, private authService: ApiService) { }

  ngOnInit(): void {
    this.studyInformationForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      shortCode: ['', Validators.required],
      startDate: ['', Validators.required],
      plannedEndDate: ['', Validators.required],
      plannedNumberOfParticipants: ['', Validators.required],
      readOnlyduration:[true],
      studyTeamMembers:[],
      durationInWeeksPerParticipant: [''],
    });

    this.authService.studyManagerListing().subscribe(res => {
      this.teamMembersdata = res?.data;
    });
  }
}
