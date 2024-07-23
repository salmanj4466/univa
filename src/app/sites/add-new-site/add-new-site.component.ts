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
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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

  constructor(private _formBuilder: FormBuilder, public api: ApiService,  private router: Router,
    public toastr: ToastrService) { }






  onSubmit() {
    this.api.postStudy({
      "name": this.SiteInfoComponent?.siteForm?.value?.name,
      "address": this.SiteInfoComponent?.siteForm?.value?.address,
      "city": this.SiteInfoComponent?.siteForm?.value?.city,
      "postalCode": this.SiteInfoComponent?.siteForm?.value?.postalCode,
      "countryCode": this.SiteInfoComponent?.siteForm?.value?.countryCode,
      "studies": [this.SiteInfoComponent?.siteForm?.value?.studies],
      "clinicalDevices": this.SiteInfoComponent?.clinicalLists,
    }).subscribe(res => {
      console.log(res);

      if(res && res.data){
        this.router.navigate(['/site-list']);
        console.log('Sign in successful');
        this.toastr.success('Sign in successful', 'Sign In Error');
       }else{
        this.toastr.error(res.message, 'Sign In Error');
       }
    });
  }
}
