import { HttpClientModule } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { ApiService } from '../../api.service';
import { SiteConfirmationComponent } from '../../components/sites/site-confirmation/site-confirmation.component';
import { SiteInfoComponent } from '../../components/sites/site-info/site-info.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClinicalDevicesComponent } from '../../components/sites/clinical-devices/clinical-devices.component';

@Component({
  selector: 'app-editsite',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    SiteInfoComponent,
    ClinicalDevicesComponent,
    SiteConfirmationComponent,
    HttpClientModule,
  ],
  providers: [ApiService],
  templateUrl: './editsite.component.html',
  styleUrl: './editsite.component.scss'
})
export class EditsiteComponent {
  @ViewChild(SiteInfoComponent)
  public SiteInfoComponent!: SiteInfoComponent;

  @ViewChild(ClinicalDevicesComponent)
  public ClinicalDevicesComponent!: ClinicalDevicesComponent;

  @ViewChild('stepper') stepper: MatStepper;


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
  siteId: number;

  constructor(private _formBuilder: FormBuilder,
    public api: ApiService,
    public router: Router,
    public toastr: ToastrService,
    public activeRoute: ActivatedRoute) {

    this.siteId = this.activeRoute.snapshot.params['id'] ? Number(this.activeRoute.snapshot.params['id']) : null;
  }


  ngAfterViewInit(): void {

    if (this.siteId) {
      this.api.getSiteById(this.siteId).subscribe(res => {
        console.log(res);
        const code: any = this.SiteInfoComponent.countrieList.find(e => e.name == res.data.country);
        this.SiteInfoComponent.siteForm.patchValue({ ...res.data, countryCode: code?.code, studies: res.data.studies[0]?.id });
        this.SiteInfoComponent.siteId = this.siteId;
      });
    }

  }



  next() {
    if (this.SiteInfoComponent.siteForm.invalid) {
      this.toastr.error('Please fill the all required fields');
      this.SiteInfoComponent.errorMessage = true;
    } else {
      this.api.putSite({
        "name": this.SiteInfoComponent?.siteForm?.value?.name,
        "address": this.SiteInfoComponent?.siteForm?.value?.address,
        "city": this.SiteInfoComponent?.siteForm?.value?.city,
        "postalCode": this.SiteInfoComponent?.siteForm?.value?.postalCode,
        "countryCode": this.SiteInfoComponent?.siteForm?.value?.countryCode,
        "studies": [Number(this.SiteInfoComponent?.siteForm?.value?.studies)],
      }, this.siteId).subscribe(res => {
        if (res && res.data) {
          // this.stepper.next();
          this.toastr.success('Site information is updated successfully');
        } else {
          this.toastr.error(res.error, 'Error');
        }
      }, err => {
        this.toastr.error(err.error.error, 'Error');
      });

    }
  }





  onSubmit() {
    if (this.siteId) {
      this.api.putSite({
        "name": this.SiteInfoComponent?.siteForm?.value?.name,
        "address": this.SiteInfoComponent?.siteForm?.value?.address,
        "city": this.SiteInfoComponent?.siteForm?.value?.city,
        "postalCode": this.SiteInfoComponent?.siteForm?.value?.postalCode,
        "countryCode": this.SiteInfoComponent?.siteForm?.value?.countryCode,
        "studies": [Number(this.SiteInfoComponent?.siteForm?.value?.studies)],
        "clinicalDevices": this.SiteInfoComponent?.clinicalLists,
      }, this.siteId).subscribe(res => {
        if (res && res.data) {
          this.router.navigate(['/site-list']);
          console.log('Sign in successful');
          this.toastr.success('Sign in successful', ' ');
        } else {
          this.toastr.error(res.error, ' ');
        }
      }, err => {
        this.toastr.error(err.error.error, ' ');
      });
    } else {
      this.api.postSite({
        "name": this.SiteInfoComponent?.siteForm?.value?.name,
        "address": this.SiteInfoComponent?.siteForm?.value?.address,
        "city": this.SiteInfoComponent?.siteForm?.value?.city,
        "postalCode": this.SiteInfoComponent?.siteForm?.value?.postalCode,
        "countryCode": this.SiteInfoComponent?.siteForm?.value?.countryCode,
        "studies": [Number(this.SiteInfoComponent?.siteForm?.value?.studies)],
        "clinicalDevices": this.SiteInfoComponent?.clinicalLists,
      }).subscribe(res => {
        console.log(res);
        debugger;
        if (res && res.data) {
          this.router.navigate(['/site-list']);
          console.log('Sign in successful');
          this.toastr.success('Sign in successful', ' ');
        } else {
          this.toastr.error(res.error, ' ');
        }
      }, err => {
        this.toastr.error(err.error.error, ' ');
      });
    }
  }

}
