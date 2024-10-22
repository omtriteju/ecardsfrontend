import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EcardDialogComponent } from '../ecard-dialog/ecard-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-e-card',
  templateUrl: './e-card.component.html',
  styleUrls: ['./e-card.component.css']
})
export class ECardComponent implements OnInit {

  email!: string | null;
  userProfile: any; // Define the structure based on your needs
  contactForm!: FormGroup;

  constructor(private route: ActivatedRoute,private fb: FormBuilder,private dialog: MatDialog) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      countryCode: ['+1', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      message: ['', [Validators.required, Validators.maxLength(1000)]]
    });
    // Retrieve the 'email' parameter from the route
    this.route.paramMap.subscribe(params => {
      this.email = params.get('email');
      console.log('Retrieved email:', this.email);
      
      // Mock logic to fetch user data based on email (e.g., could be from a local array or directly in the template)
      if (this.email) {
        this.userProfile = this.getUserProfileByEmail("mohan.krishnasai@spectraforce.com");
      }
    });
  }

  // Mock function to simulate fetching user data by email
  getUserProfileByEmail(email: string) {
    const mockData = [
      {
        email: 'mohan.krishnasai@spectraforce.com',
        name: 'Mohan Krishna Sai',
        position: 'Software Developer',
        imageUrl: 'path_to_image',
        phone: '+91XXXXXXXXXX',
        linkedin: 'https://linkedin.com/in/yourprofile',
        website: 'https://spectraforce.com'
      },
      // Add more mock users here...
    ];

    return mockData.find(user => user.email === email);
  }
  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      // Submit form logic
    }
  }

  openEcardDialog(): void {
    const dialogRef = this.dialog.open(EcardDialogComponent, {
      width: '400px',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
