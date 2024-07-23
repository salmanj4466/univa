import { Component, ViewChild } from '@angular/core';
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
import { SiteInfoComponent } from '../../components/sites/site-info/site-info.component';
import { SiteConfirmationComponent } from '../../components/sites/site-confirmation/site-confirmation.component';

@Component({
  selector: 'app-add-new-site',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    SiteInfoComponent,
    SiteConfirmationComponent,
  ],
  templateUrl: './add-new-site.component.html',
  styleUrl: './add-new-site.component.scss',
})
export class AddNewSiteComponent {

  @ViewChild(SiteInfoComponent)
  public SiteInfoComponent!: SiteInfoComponent;


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
