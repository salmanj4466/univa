import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { SiteInfoComponent } from '../../components/sites/site-info/site-info.component';
import { SiteConfirmationComponent } from '../../components/sites/site-confirmation/site-confirmation.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

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
    HttpClientModule
  ],
  providers: [ApiService],
  templateUrl: './add-new-site.component.html',
  styleUrl: './add-new-site.component.scss',
})
export class AddNewSiteComponent {

  @ViewChild(SiteInfoComponent)
  public SiteInfoComponent!: SiteInfoComponent;

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

  constructor(private _formBuilder: FormBuilder, public api: ApiService, private router: Router,
    public toastr: ToastrService, public activeRoute: ActivatedRoute) {

    this.siteId = this.activeRoute.snapshot.params['id'] ? Number(this.activeRoute.snapshot.params['id']) : null;
  }

  ngAfterViewInit(): void {
   
      if(this.siteId){
        this.api.getSiteById(this.siteId).subscribe(res => {
          console.log(res);
          this.SiteInfoComponent.siteForm.patchValue({...res.data, countryCode: res.data.countryCode, studies: res.data.studies[0].id});
        });
      }
    
  }



  next() {
    if (this.SiteInfoComponent.siteForm.invalid) {
      this.toastr.error('Please fill the all required fields');
    } else {
      this.stepper.next();
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
        console.log(res);
        debugger;
        if (res && res.data) {
          this.router.navigate(['/site-list']);
          console.log('Sign in successful');
          this.toastr.success('Sign in successful', 'Sign In Error');
        } else {
          this.toastr.error(res.error, 'Sign In Error');
        }
      }, err => {
        this.toastr.error(err.error.error, 'Sign In Error');
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
          this.toastr.success('Sign in successful', 'Sign In Error');
        } else {
          this.toastr.error(res.error, 'Sign In Error');
        }
      }, err => {
        this.toastr.error(err.error.error, 'Sign In Error');
      });
    }
  }
}
