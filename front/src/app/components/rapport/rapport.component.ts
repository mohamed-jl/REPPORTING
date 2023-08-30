import { Component,OnInit  } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FunctionService } from '../../services/function.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';



@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.css']
})
export class RapportComponent implements OnInit{

  functions: any[]= [];
  repRapports: any[]= [];
  selectedFunctionId!: number;
selectedRepRapportId!: number;
functionControl = new FormControl();
repRapportControl = new FormControl();
filteredFunctions!: Observable<any[]>;
filteredRepRapports!: Observable<any[]>;




  constructor(
    private functionService:FunctionService,
    private dialogRef: MatDialogRef<RapportComponent>)
     {}

    

     loadFunctions() {
      this.functionService.getAllFunction()
        .subscribe(response => {
          this.functions = response;
          this.filteredFunctions = this.functionControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filterFunctions(value))
          );
        }, error => {
          console.error(error);
        });
    }
    
    private _filterFunctions(value: string): any[] {
      const filterValue = value;
      return this.functions.filter(f => f.functionName.toLowerCase().includes(filterValue));
    }
    
    loadRepRapports() {
      this.functionService.getAllRepRapports()
        .subscribe(response => {
          this.repRapports = response;
          this.filteredRepRapports = this.repRapportControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filterRepRapports(value))
          );
        }, error => {
          console.error(error);
        });
    }
    
    private _filterRepRapports(value: string): any[] {
      const filterValue = value;
      return this.repRapports.filter(r => r.name.toLowerCase().includes(filterValue));
    }
    

    assignRepRapportToFunction() {
      console.log(this.functionControl.value, this.repRapportControl.value)
      this.functionService.assignRepRapportToFunction(this.functionControl.value?.id, this.repRapportControl.value?.id)
        .subscribe(response => {
          console.log(response); // handle the response as needed
          this.dialogRef.close();
        }, error => {
          console.error(error); // handle the error as needed
        });
    }
    cancel(){
      this.dialogRef.close();
    }

  ngOnInit() {
    this.loadFunctions();
    this.loadRepRapports();
  }

}
