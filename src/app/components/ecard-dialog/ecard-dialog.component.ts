import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ecard-dialog',
  templateUrl: './ecard-dialog.component.html',
  styleUrls: ['./ecard-dialog.component.css']
})
export class EcardDialogComponent implements OnInit {
  pageUrl!: string;
  elementType: 'url' | 'canvas' | 'img' = 'img'; // Set the element type here
  value = '';

  constructor(public dialogRef: MatDialogRef<EcardDialogComponent>) {}
  ngOnInit(): void {
    this.value = window.location.href; // Current page URL
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  downloadEcard(): void {
    // Logic to download e-card
    console.log('Download e-card clicked');
  }
}
