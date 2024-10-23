import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import html2canvas from 'html2canvas';

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

  
  downloadEcard() {
    const ecardElement = document.querySelector('.qr-ecard') as HTMLElement;
  
    // Capture the e-card div as an image without extra padding/margins
    html2canvas(ecardElement, {
      scale: 2, // Increase the resolution of the canvas
      useCORS: true, // Enable cross-origin resource sharing if there are external images
      backgroundColor: null, // Set the background color to null for transparent background
      scrollX: 0, // Prevent scrolling while capturing
      scrollY: 0,
      width: ecardElement.clientWidth, // Use the actual width of the card
      height: ecardElement.clientHeight // Use the actual height of the card
    }).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/jpeg');  // Capture as a JPEG
      link.download = 'e-card.jpg';  // File name for download
      link.click();  // Trigger the download
    });
    this.dialogRef.close();
  }
  
}
