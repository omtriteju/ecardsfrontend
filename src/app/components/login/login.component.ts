import { Component, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name: string = '';
  email: string = '';
  additionalInfo: any;
  errorMessage:string='';
  isLoading: boolean = false;  // New property for loading state
  isLoading2: boolean = false;  // New property for loading state

  constructor(private loginService: LoginService,private router:Router) { }

  ngOnInit(): void {
   
  }

  currentStep: number = 0; // Initialize the current step to 0

  // Method to go to the next step
  onNext() {
    if (this.currentStep < 2) { // Ensure we don't exceed the number of steps
      this.currentStep++;
    }
  }

  // Method to go to the previous step (if needed)
  onBack() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  // Method to check if the step is active
  isStepActive(step: number): boolean {
    return this.currentStep === step;
  }

  isStepCompleted(step: number): boolean {
    return this.currentStep > step;
  }

  otp: string = '';  // To store the complete OTP

  // Method to move focus when a digit is entered
  onInput(event: any, index: number) {
    const input = event.target;
    const value = input.value;

    if (value.length === 1 && index < 3) {
      const nextBox = document.getElementById(`codeBox${index + 2}`);
      if (nextBox) (nextBox as HTMLInputElement).focus();
    }

    // Update the OTP value as the user enters digits
    this.updateOtp();
  }

  // Method to handle backspace and auto move focus
  onKeyDown(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;
    if (event.key === 'Backspace' && input.value === '' && index > 0) {
      const prevBox = document.getElementById(`codeBox${index}`);
      if (prevBox) (prevBox as HTMLInputElement).focus();
    }
  }

  // Method to update the OTP string as digits are entered
  updateOtp() {
    const otpBoxes = Array.from(document.querySelectorAll('.code-box'));
    this.otp = otpBoxes.map((box: any) => box.value).join('');
  }

  
  // Utility method to check if the email format is valid
  isEmailValid(): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(this.email);
  }
  

  sendOtp() {
    this.isLoading = true;  // Start loading
    this.errorMessage = '';

    if (this.email.trim() === '' || !this.isEmailValid()) {
      this.errorMessage = this.email.trim() === '' 
          ? 'Email cannot be empty.' 
          : 'Please enter a valid email address.';
      this.isLoading = false;  // Stop loading on error
    } else {
      this.loginService.sendOtp(this.email).subscribe(
        response => {
          this.onNext();
          this.isLoading = false;  // Stop loading
        },
        error => {
          this.errorMessage = error.error?.message || 'Failed to send OTP. Please try again.';
          this.isLoading = false;  // Stop loading on error
        }
      );
    }
  }
  ReSendOtp() {
    this.isLoading2 = true;  // Start loading
    this.errorMessage = '';

    if (this.email.trim() === '' || !this.isEmailValid()) {
      this.errorMessage = this.email.trim() === '' 
          ? 'Email cannot be empty.' 
          : 'Please enter a valid email address.';
      this.isLoading = false;  // Stop loading on error
    } else {
      this.loginService.sendOtp(this.email).subscribe(
        response => {
          
          this.isLoading2 = false;  // Stop loading
        },
        error => {
          this.errorMessage = error.error?.message || 'Failed to send OTP. Please try again.';
          this.isLoading2 = false;  // Stop loading on error
        }
      );
    }
  }

  verifyOtp() {
    this.isLoading = true;  // Start loading
    this.errorMessage = '';

    this.loginService.verifyOtp(this.email, this.otp).subscribe(
      response => {
        this.router.navigate(['/dashboard']);
        this.isLoading = false;  // Stop loading
      },
      error => {
        this.errorMessage = error.error?.message || 'OTP verification failed. Please try again.';
        this.isLoading = false;  // Stop loading on error
      }
    );
  }

}
