import { Component, Input } from '@angular/core';
import { ApiService } from '../../../api.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clinical-devices',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './clinical-devices.component.html',
  styleUrl: './clinical-devices.component.scss',
})
export class ClinicalDevicesComponent {
  lists: any[] = [];
  @Input() itemId; 
  addDevices = "";
  constructor(private api: ApiService,     public toastr: ToastrService, ){

  }

  ngAfterViewInit(): void {
   this.getId();
  }

  getId(){
    this.api.getClinicalDevicesId(this.itemId).subscribe(res => {
      console.log(res);
      this.lists = res?.data;
     
    });
  }
  remove(id: any){
    this.api.deleteClinicalDevicesId(this.itemId, id).subscribe(res => {
      if(res && res.message){
        this.toastr.success(  res.message || 'Site information is deleted successfully');
        this.getId();
      }else{
        this.toastr.error(res || "Please try again");
      }
    }); 
  }

  save(id: any, name){
    console.log(name);
    this.api.putClinicalDevicesId(this.itemId, id, {name: name}).subscribe(res => {
      if(res && res.id){
        this.toastr.success(  res.message || 'Site information is updated successfully');
        this.getId();
        this.getId();
      }else{
        this.toastr.error(res || "Please try again");
      }
    }, err=>{
      this.toastr.error(err.error.error || "Please try again");
    }); 
  }

  deleteAll(){
    this.api.deleteClinicalDevices(this.itemId).subscribe(res => {
      if(res && res.message){
        this.toastr.success(  res.message || 'Site information is deleted successfully');
        this.getId();
      }else{
        this.toastr.error(res || "Please try again");
      }
    }, err=>{
      this.toastr.error(err.error.error || "Please try again");
    }); 
  }

  add(){
    this.api.addClinicalDevices(this.itemId, {clinicalDevices: [this.addDevices]}).subscribe(res => {
      if(res && res.message){
        this.toastr.success(  res.message || 'Site information is added successfully');
        this.getId();
        this.addDevices = "";
      }else{
        this.toastr.error(res || "Please try again");
      }
    }, err=>{
      this.toastr.error(err.error.error || "Please try again");
    }); 
  }
}
