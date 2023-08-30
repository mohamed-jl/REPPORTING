import { Component, OnInit,Inject  } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-order-user-charts',
  templateUrl: './order-user-charts.component.html',
  styleUrls: ['./order-user-charts.component.css']
})
export class OrderUserChartsComponent implements OnInit{
  reports: any;
  userId : any;
  constructor(private route: ActivatedRoute,private userService:UserService,@Inject(MAT_DIALOG_DATA) public data: { userId: number },private dialogRef: MatDialogRef<OrderUserChartsComponent>){}


  ngOnInit(): void {
    this.userId = this.data.userId
    console.log(this.userId)
    //this.userId =this.route.snapshot.paramMap.get('id');
    this.userService.getReportsByUserId(this.userId).subscribe(data=>{
      this.reports=data
      console.log(this.reports)
    })
  }

  onDrop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.reports, event.previousIndex, event.currentIndex);
    // Update the order of the reports in the backend
    this.reports.forEach((report: { id: any; }, index: number) => {
      this.userService.updateReportOrderForUser(this.userId, report.id, index + 1)
        .subscribe(() => {
          console.log('Report order updated successfully');
        }, (error) => {
          console.error('Error updating report order:', error);
        });
    });
  }
  

  cancel(){
    this.dialogRef.close();
  }

}
