import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-site-info',
  standalone: true,
  imports: [NgbTooltipModule,  FormsModule, RouterLink, ReactiveFormsModule],
  providers: [ApiService],
  templateUrl: './site-info.component.html',
  styleUrl: './site-info.component.scss'
})
export class SiteInfoComponent {
  countrieList:any[]=[];
  studyLists:any[]=[];
  clinicalLists:any[]=[];
  siteForm!: FormGroup;
  errorMessage= false;
  siteId: number;
  studyListInfo:any[]=[];
  constructor(private api: ApiService, private fb: FormBuilder) {
    this.countries();
    this.studyListing();
  }


  ngOnInit(): void {
    this.siteForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      countryCode: ['', Validators.required],
      studies: ['', Validators.required],
      clinicalDevices: [[]],
      clinicalname: ['']
    });
  }


  countries() {

    this.api.countries().subscribe(
      (res: any) => {
        console.log(res);
        this.countrieList = res;
      },
      error => {

      }
    );
  }


  
  studyListing() {

    this.api.studyListing({
      sort: "id",
      start: 0,
      size: 90000,
    }).subscribe(
      (res: any) => {
        console.log(res);
        this.studyLists = res.data;
      },
      error => {

      }
    );
  }

  
  add(){
    this.clinicalLists.push(this.siteForm.value.clinicalname);
    this.siteForm.patchValue({clinicalname: ''});
  }

  remove(i: any){
    debugger;
    this.clinicalLists.splice(i,1);
  }

  onSubmit() {
    if (this.siteForm.valid) {
      console.log(this.siteForm.value); // You can send this data to your backend or perform other actions
    } else {
      console.log('Form is invalid');
    }
  }

  getstudyListInfo(){
    this.studyListInfo = this.studyLists.filter(f => f.id == this.siteForm.value.studies);
  }

}
