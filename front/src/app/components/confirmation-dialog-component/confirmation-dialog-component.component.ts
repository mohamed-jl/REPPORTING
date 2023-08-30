import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog-component',
  templateUrl: './confirmation-dialog-component.component.html',
  styleUrls: ['./confirmation-dialog-component.component.css']
})
export class ConfirmationDialogComponentComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) {}

onCancelClick(): void {
this.dialogRef.close(false);
}

onConfirmClick(): void {
this.dialogRef.close(true);
}

}
