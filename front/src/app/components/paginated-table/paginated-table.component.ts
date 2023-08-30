import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { TableDialogComponent } from '../table-dialog/table-dialog.component';
import { ChartService } from 'src/app/services/chart.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-paginated-table',
  templateUrl: './paginated-table.component.html',
  styleUrls: ['./paginated-table.component.css']
})
export class PaginatedTableComponent implements AfterViewInit {
  @Input() columns: string[] = [];
  @Input() data: any[] = [];
  @Input() idrep: any[] = [];
  @Input() title: any[] = [];
  
  dataSource: MatTableDataSource<any>;
  selectedRow: any;
  searchActive: boolean = false;

  newCols:any[]=['date_appel' ,'voice' ,'sms' ,'data' ,'roaming' , 'offer' , 'transert' ,'com' ,'loan' ,'evd' ,'mobile_money' , 'total']
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  constructor(public dialog: MatDialog, public chartService: ChartService) {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  
  ngOnChanges(): void {
    if (this.columns.length === 0 || this.columns[0] === "") {
      // Use newCols when listenamereptab is empty or undefined
      this.columns = this.newCols;
    }
    this.dataSource.data = this.transformData(this.data, this.columns);
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }
  
  transformData(data: any[], columns: string[]): any[] {
    if (columns.includes('"Impact(dinar)"')) {
      return data.filter(row => row[columns.indexOf('"Impact(dinar)"')] > 0)
        .map(row => {
          let obj: { [key: string]: any } = {};
          row.forEach((cell: any, index: any) => {
            obj[columns[index]] = cell;
          });
          return obj;
        });
    } else {
      return data.map(row => {
        let obj: { [key: string]: any } = {};
        row.forEach((cell: any, index: any) => {
          obj[columns[index]] = cell;
        });
        
        return obj;
      });
    }
  }
  
  
  
  
  formatNumber(value: any): string {
    if (typeof value === 'number') {
      const options = {
        minimumFractionDigits: 2,
        maximumFractionDigits: 5,
      };
      const formattedValue = value.toLocaleString('en-US', options);
      const parts = formattedValue.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

      return parts.join('.');
    }
    return value;
  }
  
  openDialog(row: any): void {
    // Fetch data from the API
    this.chartService.getDetails(this.idrep, row[this.columns[0]]).subscribe(response => {
      const columns = response.listnamereptab;
      const data = response.list_de_donnees.map((d: any) => {
        let obj: { [key: string]: any } = {};
        d.forEach((cell: any, index: any) => {
          obj[columns[index]] = cell;
        });
        return obj;
      });
  
      this.dialog.open(TableDialogComponent, {
        data: {
          columns,
          rows: data,
          title: this.title
        }
      });
    });
  }
  
  selectRow(row: any) {
    this.selectedRow = row;
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  toggleSearch() {
    this.searchActive = !this.searchActive;
  }
  
}
