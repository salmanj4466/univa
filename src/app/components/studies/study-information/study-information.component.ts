import { HttpClientModule } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { ApiService } from "../../../api.service";
import { Router } from "express";

@Component({
  selector: "app-study-information",
  standalone: true,
  imports: [NgbTooltipModule, ReactiveFormsModule, HttpClientModule],
  providers:[ApiService,],
  templateUrl: "./study-information.component.html",
  styleUrl: "./study-information.component.scss",
})
export class StudyInformationComponent {
  studyInformationForm!: FormGroup;
  errorMessage!: string;

  constructor(private fb: FormBuilder, private authService: ApiService) {}

  ngOnInit(): void {
    this.studyInformationForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      shortCode: ['', Validators.required],
      startDate: ['', Validators.required],
      plannedEndDate: ['', Validators.required],
      plannedNumberOfParticipants: ['', Validators.required],
      durationInWeeksPerParticipant: ['', Validators.required],
    });
  }
}
