import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.css']
})
export class CreateUserDialogComponentComponent  {
  user = {
    firstName: 'Devendra',
    lastName: 'Dobarkar',
    email: 'myemail@spectraforce.com',
    jobTitle: 'Sr. IT Manager',
    phoneNumberPrimary: '',
    phoneNumberSecondary: '',
    linkedinLink: '',
    websiteLink: ''
  };

  saveChanges() {
    // Logic to save changes
    console.log('User updated:', this.user);
  }

  cancelEdit() {
    // Logic to cancel the edit
    console.log('Edit canceled');
  }

  addLink() {
    // Logic to add a link
    console.log('Add link clicked');
  }
}