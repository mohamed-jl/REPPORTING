import { Component, OnInit,Inject  } from '@angular/core';
import { FunctionService } from 'src/app/services/function.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-order-function',
  templateUrl: './order-function.component.html',
  styleUrls: ['./order-function.component.css']
})
export class OrderFunctionComponent implements OnInit{

  reports: any;
  funcId : any;
  constructor(private route: ActivatedRoute,private functionService:FunctionService,@Inject(MAT_DIALOG_DATA) public data: { funcId: number },private dialogRef: MatDialogRef<OrderFunctionComponent>){}


  ngOnInit(): void {
    this.funcId = this.data.funcId
    console.log(this.funcId)
    //this.funcId =this.route.snapshot.paramMap.get('id');
    this.functionService.getReportsByFunctionId(this.funcId).subscribe(data=>{
      this.reports=data
      console.log(this.reports)
    })
  }

  onDrop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.reports, event.previousIndex, event.currentIndex);
    // Update the order of the reports in the backend
    this.reports.forEach((report: { id: any; }, index: number) => {
      this.functionService.updateReportOrderForFunction(this.funcId, report.id, index + 1)
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
