import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ecard-dialog',
  templateUrl: './ecard-dialog.component.html',
  styleUrls: ['./ecard-dialog.component.css']
})
export class EcardDialogComponent {

  constructor(public dialogRef: MatDialogRef<EcardDialogComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  downloadEcard(): void {
    // Logic to download e-card
    console.log('Download e-card clicked');
  }
}
