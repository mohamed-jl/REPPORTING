import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/model/User';
import { ConfirmationDialogComponentComponent } from '../confirmation-dialog-component/confirmation-dialog-component.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-user-rapports',
  templateUrl: './list-user-rapports.component.html',
  styleUrls: ['./list-user-rapports.component.css']
})
export class ListUserRapportsComponent implements OnInit {
  constructor(private router: Router,public dialog: MatDialog,public dialogRef: MatDialogRef<ListUserRapportsComponent>, @Inject(MAT_DIALOG_DATA) public user: any,public userService: UserService){
  }

  ngOnInit(){
  }

  detacheRapport(id:any,rep:any){
    const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent, {
      width: '350px',
      data: 'Are you sure you want to delete this rapport from this user?'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.detacheRapport(id,rep).subscribe(
          res => {
           this.dialog.closeAll();

          },
          err => {
            console.log(err);
          }
        )
      }
    });
  }
}
