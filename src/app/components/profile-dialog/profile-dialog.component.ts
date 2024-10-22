import { Component, Inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.css']
})
export class ProfileDialogComponent {
  user: any;
  title: any;
  isSubmitted: boolean = false; // Flag to track if the form has been submitted

  @ViewChild('userForm') userForm!: NgForm; // Add this line

  constructor(
    public dialogRef: MatDialogRef<ProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.user = data ? { ...data } : {
      firstName: '',
      lastName: '',
      email: '',
      jobTitle: '',
      phoneNumberPrimary: '',
      phoneNumberSecondary: '',
      linkedinLink: '',
      websiteLink: ''
    };
    // Set title based on user data
    this.title = data ? 'Edit Profile' : 'Create Profile';
  }

  saveChanges(form:NgForm) {
    
    
    // Mark all fields as touched
    if (form.invalid) {
      console.log("gfdsa")
      form.form.markAllAsTouched();
    }
    else{
      this.dialogRef.close(this.user); // Send the user data back for creation or update
    }
   

   
  }

  cancelEdit() {
    this.dialogRef.close(); // Close without saving
  }
}
