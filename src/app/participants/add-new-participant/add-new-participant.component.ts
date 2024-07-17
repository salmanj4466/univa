import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { PersonalInfoComponent } from '../../components/participants/add-new/personal-info/personal-info.component';
import { PatientProfileComponent } from '../../components/participants/add-new/patient-profile/patient-profile.component';
import { ConfirmationComponent } from '../../components/participants/add-new/confirmation/confirmation.component';

@Component({
  selector: 'app-add-new-participant',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    PersonalInfoComponent,
    PatientProfileComponent,
    ConfirmationComponent,
  ],
  templateUrl: './add-new-participant.component.html',
  styleUrl: './add-new-participant.component.scss',
})
export class AddNewParticipantComponent {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  fourFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  isLinear = false;

  constructor(private _formBuilder: FormBuilder) {}
}
