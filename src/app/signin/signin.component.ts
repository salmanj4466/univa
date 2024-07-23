import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ApiService } from '../api.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule,RouterOutlet, RouterLink, ReactiveFormsModule, HttpClientModule],
  providers:[ApiService,],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  signinForm!: FormGroup;
  errorMessage!: string;

  constructor(private fb: FormBuilder, 
    private authService: ApiService, 
    private router: Router,
  public toastr: ToastrService) {}

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.signinForm.valid) {
      const { email, password } = this.signinForm.value;
      this.authService.signIn(email, password).subscribe(
        (res: any) => {
          // Handle successful sign-in (redirect, show message, etc.)
         if(res && res.data && res.data.token){
          localStorage.setItem('token', res.data.token);
          this.router.navigate(['/add-new-study']);
          console.log('Sign in successful');
          this.toastr.success('Sign in successful', 'Sign In Error');
         }else{
          this.toastr.error(res.message, 'Sign In Error');
         }
        },
        error => {
          this.errorMessage = error.error.message;
          this.toastr.error(error.error.message, 'Sign In Error'); // Assuming API returns error message
          console.error('Sign in error:', error);
        }
      );
    } else {
      // Mark fields as touched to trigger validation messages
      this.signinForm.markAllAsTouched();
    }
  }
  
}
