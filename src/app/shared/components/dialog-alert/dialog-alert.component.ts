import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-alert',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './dialog-alert.component.html',
  styleUrl: './dialog-alert.component.scss'
})
export class DialogAlertComponent {

  constructor(public dialogRef: MatDialogRef<DialogAlertComponent>) { }

  onClick(): void {
    this.dialogRef.close(true);
  }

}
