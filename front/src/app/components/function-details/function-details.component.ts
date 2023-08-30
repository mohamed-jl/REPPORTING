import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FunctionService } from '../../services/function.service';

@Component({
  selector: 'app-function-details',
  templateUrl: './function-details.component.html',
  styleUrls: ['./function-details.component.css']
})
export class FunctionDetailsComponent implements OnInit{
  functionId: any;
  repRapports: any;
  repRapportId: any;

  constructor(private route:ActivatedRoute,private functionService:FunctionService){}
  ngOnInit(): void {
    this.functionId =this.route.snapshot.paramMap.get('id');
      this.functionService.getRepRapportsByFunctionId(this.functionId).subscribe(data=>{
        this.repRapports=data
        console.log(this.repRapports)
      })
  }

  removeRepRapportFromFunction(functionId:any,repRapportId:any) {
    this.functionService.removeRepRapportFromFunction(functionId,repRapportId).subscribe(
      response => {
        console.log('RepRapport removed from Function successfully.');
        this.ngOnInit()
        // Do something else here if needed, like refreshing the page
      },
      error => {
        console.log('Error removing RepRapport from Function:', error);
      }
    );
  }
}
  


