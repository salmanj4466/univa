import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../api.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HttpClientModule],
  providers:[ApiService,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private authService: ApiService, private router: Router, private toastr: ToastrService) {}


  logOut() {
      this.authService.signOut().subscribe(
        (res: any) => {
          // Handle successful sign-in (redirect, show message, etc.)
          if(res){
            localStorage.clear();
            this.router.navigate(['/signin']);
            console.log('Sign in successful');
            this.toastr.success(res.message, 'Signout Succssfully');
          }
        },
        error => {
          this.toastr.error(error.error.message, 'Sign In Error');
          // this.toastr.error(error.error.message, 'Sign In Error'); // Assuming API returns error message
          console.error('Sign in error:', error);
        }
      );
    }
}
