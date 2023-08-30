import { AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChildren ,ChangeDetectorRef,HostListener} from '@angular/core';
import * as Highcharts from 'highcharts';
import Accessibility from 'highcharts/modules/accessibility';
import ExportingModule from 'highcharts/modules/exporting';
import type { SeriesOptionsType } from 'highcharts';
import { AuthService } from 'src/app/services/auth.service';
import { ChartService } from 'src/app/services/chart.service';
import { User } from 'src/model/User';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterService } from 'src/app/services/filter.service';
import {Filters} from 'src/model/Filters'
import { FilterType } from 'src/model/FilterType';
import HC_exportData from 'highcharts/modules/export-data';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TableDialogComponent } from '../table-dialog/table-dialog.component';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import {HIGHCHARTS_TYPES } from 'src/model/HIGHCHARTS_TYPES'
import { LoaderService } from 'src/app/services/loader.service';
import { FunctionService } from 'src/app/services/function.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { OrderFunctionComponent } from '../order-function/order-function.component';
import * as XLSX from 'xlsx';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Chart,SeriesAbandsOptions, SeriesPieOptions } from 'highcharts';

import { ViewChild } from '@angular/core';
import { data } from 'jquery';
import { Observable, Subscription, catchError, map, of } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { HighchartsChartComponent } from 'highcharts-angular';



Accessibility(Highcharts)
ExportingModule(Highcharts);
HC_exportData(Highcharts);
@Component({
  selector: 'app-function-charts',
  templateUrl: './function-charts.component.html',
  styleUrls: ['./function-charts.component.css']
})
export class FunctionChartsComponent implements OnInit , OnDestroy {
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatPaginator) paginators = new QueryList<MatPaginator>();
  @ViewChild('chart', { static: false })
  private chartComponent!: HighchartsChartComponent;
  private chartInstance!: Chart;
  dataSources: MatTableDataSource<any>[] = [];
  
  highcharts = Highcharts;
  chartOptions: Highcharts.Options[] = [];
  chart: Highcharts.Chart | null | undefined;
  chartData:any[] = [];
  funcId : any;
  user!:User;
  newuser!:User;


  startDate!: Date|null;
  endDate!: Date|null;
  isVaration= false
  filterType = FilterType
  filtred: Filters = {
    startDate: null, endDate: null,
    idfunction: 0,
    type_Filter: this.filterType.None,
    isVaration: false,
    isPerHour: false,
    startHour: null,
    endHour: null
  };
  public selectedChartType: string = 'default';
  highchartsTypes = HIGHCHARTS_TYPES
  isLoading: boolean = false;
  reports: any;
  selectedRowIndex = -1
  isChartDisplayed = false;
  pageSizeOptions = [2,5, 10, 25, 100];
  private filtredSubscription!: Subscription;
  private d!: Subscription;
  selectedChartTypes: string[] = [];
  chartInstances: any[] = [];
  isTable:boolean=false;
  isDark:boolean=false;
  backgroundColor: string = '#322E49';
  error:boolean = false
  funcName!:String
  
  constructor(private chartService:ChartService,
              private route: ActivatedRoute,
              private router:Router,
              public filterService:FilterService,
              public dialog: MatDialog,
              private userService:UserService,
              private service:AuthService,
              private toastr: ToastrService,
              private loaderService:LoaderService,
              private functionService:FunctionService,
              private changeDetectorRef: ChangeDetectorRef){}

  

              ngOnInit() {
                this.loaderService.show();
                this.route.params.subscribe(params => {
                  this.funcId = params['id'];
                  this.error = false;
                  console.log(params['id']);
                  if (this.filtredSubscription) {
                    this.filtredSubscription.unsubscribe();
                  }
                  this.filtredSubscription = this.filterService.filtredUpdatedFunctionChart.subscribe((filtred) => {
                    this.filtred = filtred;
                    this.filtred.idfunction = this.funcId;
                    console.log("id", this.funcId);
                    console.log("filtre:", this.filtred);
              
                    this.loaderService.show(); // Show loader before making API calls
              
                    if(this.filtred.isVaration === false && this.filtred.isPerHour === false) {
                      this.chartService.getFunctionChartFiltred(filtred).subscribe((data:any)=>{
                        if(data){
                          // update chartData with the filtered data
                          data.forEach((filteredChartData: { title: any; list_de_donnees: any[][]; }) => {
                            filteredChartData.list_de_donnees = filteredChartData.list_de_donnees !== null ? filteredChartData.list_de_donnees : [];
                            const existingChartData = this.chartData.find((chartData: { title: any; }) => chartData.title === filteredChartData.title);
                            if (existingChartData) {
                              existingChartData.list_de_donnees = filteredChartData.list_de_donnees;
                            } else {
                              this.chartData.push(filteredChartData);
                            }
                          });
                          this.buildChart(this.chartData);
                        } else {
                          this.chartOptions = [];
                        }
                        this.loaderService.hide();
                      },
                      (error: any) => {
                        console.log(error);
                        this.loaderService.hide();
                      });
                    } if(this.filtred.isPerHour && this.filtred.startHour!=null && this.filtred.endHour!=null) {
                      this.filtred.type_Filter = this.filterType.Custom;
                      this.chartService.getFunctionChartFiltredPerHour(filtred).subscribe(
                        (data: any) => {
                          if (data !== null) {
                            console.log("2nd")
                            this.updateChartData(data);
                            this.buildChart(this.chartData);
                          } else {
                            this.chartOptions = [];
                          }
                          this.loaderService.hide(); // Hide loader after API call
                        },
                        (error: any) => {
                          console.log(error);
                          this.loaderService.hide(); // Hide loader in case of error
                        }
                      );
                    } if (this.filtred.isVaration) {
                      this.chartService.getFunctionChartVariation(filtred).subscribe(
                        (data: any) => {
                          if (data) {
                            const filteredData = data.map((chartData: any) => {
                              const filteredList = chartData.list_de_donnees.filter((row: any[]) => row.some((val: any) => val !== null));
                              return {
                                ...chartData,
                                list_de_donnees: filteredList,
                              };
                            });
                            console.log("variation")
                            this.updateChartData(filteredData);
                            this.buildChart(this.chartData);
                          } else {
                            this.chartOptions = [];
                          }
                          this.loaderService.hide(); // Hide loader after API call
                        },
                        (error: any) => {
                          console.log(error);
                          this.loaderService.hide(); // Hide loader in case of error
                        }
                      );
                    }
                  });
              
                  this.d = this.chartService.getFunctionChart(this.funcId).subscribe(
                    (data: any) => {
                      if (data) {
                        this.chartData = data;
                        this.replaceNumbersWithOperatorNames(this.chartData).subscribe(
                          (modifiedData: any[]) => {
                            this.chartData = modifiedData;
                            console.log("replaced:", this.chartData);
                            this.buildChart(this.chartData);
                          },
                          (error: any) => {
                            this.error = true;
                            this.getFunctionName();
                            console.log(error);
                            this.loaderService.hide(); // Hide loader in case of error
                          }
                        );
                      }
                      this.loaderService.hide(); // Hide loader after API call
                    }
                  );
                
                });
              }

  onDrop(event: CdkDragDrop<any[]>) {
    const repId = this.reports[event.currentIndex].id;
    const newOrder = event.currentIndex+1;
    this.functionService.updateReportOrderForFunction(this.funcId, repId, newOrder)
      .subscribe(() => {
        console.log('Report order updated successfully');
      }, (error) => {
        console.error('Error updating report order:', error);
      });
  }
  


  buildChart(data: any[]): any {
    this.loaderService.show();
    this.loaderService.isLoading$.subscribe(isLoading => this.isLoading = isLoading);
    console.log(this.chartData);
    this.chartOptions = [];
  
    data.forEach((chartData: {
      listnamerep: any[],
      list_de_donnees: any[][],
      title: any,
      listnamereptab: any[],
      chart_type: any
    }) => {
      let subtitleText = chartData.title + ': ';
      if (chartData.list_de_donnees.length === 1) {
        subtitleText += 'Date: ' + chartData.list_de_donnees[0][0];
      } else if (chartData.list_de_donnees.length >= 2) {
        subtitleText += 'Between ' + chartData.list_de_donnees[0][0] + ' and ' + chartData.list_de_donnees[chartData.list_de_donnees.length - 1][0];
      }
  
      if (chartData.chart_type === 'pie') {
        const seriesData = chartData.list_de_donnees.map((data: { toString: () => any; }[]) => ({
          name: data[0].toString(),
          y: parseFloat(data[1].toString())
        }));
  
        this.chartOptions.push({
          credits: {
            enabled: false
          },
          chart: {
            type: chartData.chart_type,
            height: '40%'
          },
          title: {
            text: chartData.title + '<br><hr style="height:2px;color:white;background-color:gray">',
            align: 'left',
            useHTML: true,
            style: {
              fontWeight: 'bold',
              fontSize: '16px',
              minWidth: '90%'
            }
          },
          subtitle: {
            text: chartData.title,
            align: 'center',
            style: {
              fontSize: '14px'
            }
          },
          tooltip: {
            valueDecimals: 1
          },
          plotOptions: {
            pie: {
              dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f}%'
              }
            }
          },
          responsive: {
            rules: [{
              condition: {
                maxWidth: 1000
            }}]
          },
          series: [
            {
              type: chartData.chart_type,
              name: chartData.listnamereptab[0],
              data: seriesData
            }
          ]
        });
      } else {
        const seriesData = chartData.listnamerep.slice(0).map((name: any, i: number) => ({
          name: name,
          data: chartData.list_de_donnees.map((data: { toString: () => any; }[]) => data[i + 1])
        }));
  
        this.chartOptions.push({
          credits: {
            enabled: false
          },
          chart: {
            type: chartData.chart_type,
            height: '40%'
          },
          title: {
            text: chartData.title + '<br><hr style="height:2px;color:white;background-color:gray">',
            align: 'left',
            useHTML: true,
            style: {
              fontWeight: 'bold',
              fontSize: '16px',
              minWidth: '90%'
            }
          },
          subtitle: {
            text: subtitleText,
            align: 'center',
            style: {
              fontSize: '14px'
            }
          },
          responsive: {
            rules: [{
              condition: {
                maxWidth: 1000
            }}]
          },
          xAxis: {
            title: {
              text: chartData.listnamereptab[0]
            },
            categories: chartData.list_de_donnees.map((data: { toString: () => any; }[]) => data[0].toString())
          },
          yAxis: {
            title: {
              text: 'Values'
            }
          },
          legend: {
            enabled: true
          },
          exporting: {
            enabled: true,
            chartOptions: {
              chart: {
                width: 1000,
                height: 800
              }
            },
            menuItemDefinitions: {
              viewData: {
                text: 'View Data Table',
                onclick: () => this.openDialog(chartData.list_de_donnees, chartData.listnamereptab)
              }
            },
            buttons: {
              contextButton: {
                menuItems: ['viewData', 'viewFullscreen', 'separator', 'downloadPNG', 'downloadPDF', 'downloadSVG', 'downloadCSV']
              }
            }
          },
          tooltip: {
            valueDecimals: 1
          },
          plotOptions: {
            series: {
              borderWidth: 0,
              dataLabels: {
                enabled: true,
                format: '{point.y:.1f}'
              }
            }
          },
          series: seriesData.map((data: { name: any; data: any; }) => ({
            type: chartData.chart_type,
            name: data.name,
            data: data.data
          })) as SeriesOptionsType[]
        });
      }
    });
  
    this.changeDetectorRef.detectChanges();
    this.loaderService.hide();
    this.isChartDisplayed = true;
    return this.chartOptions;
  }


  exportCSV() {
    if (this.chart) {
      const csv = this.chart.getCSV();
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('hidden', '');
      a.setAttribute('href', url);
      a.setAttribute('download', 'chart_data.csv');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  openDialog(rows: any[], columns: string[]): void {
    const formattedRows = rows.map(row => {
      return row.reduce((obj: any, val: any, index: number) => {
        if (typeof val === 'number') {
          obj[columns[index]] = val.toLocaleString('en-US', {maximumFractionDigits: 2});
        } else {
          obj[columns[index]] = val;
        }
        return obj;
      }, {});
    });
    const dialogRef = this.dialog.open(TableDialogComponent, {
      data: { rows: formattedRows, columns: columns }
    });
  }
  
  
  addToDashboard(id:any){
    this.newuser = this.service.uuser
    this.userService.addToDashboard(this.newuser.uId,id).subscribe(() => {
      this.toastr.success('Repport added successfully!', 'Success');
    });
  }


  updateChartType(chartIndex: number, event: any) {
    if (event.value === 'table') {
      this.isTable = true;
      this.chartData[chartIndex].chart_type = event.value
      this.buildChart(this.chartData)
    } else {
      this.isTable = false;
      const chartElement = document.getElementById(`chartc-${chartIndex}`);
      const chartOptions = this.chartOptions[chartIndex];
  
      if (chartElement && chartOptions.chart && chartOptions.series) {
        // Update the chart type for the selected chart
        chartOptions.chart.type = event.value;
  
        // Update the series chart type
        chartOptions.series.forEach((series: SeriesOptionsType) => {
          series.type = event.value;
        });
  
        // Destroy the existing chart instance
        const chartInstance = this.chartInstances[chartIndex];
        if (chartInstance) {
          chartInstance.destroy();
        }
  
        // Enable exporting menu again
        chartOptions.exporting = this.chartOptions[chartIndex].exporting

        // Create a new Highcharts chart instance with the updated options
        this.chartInstances[chartIndex] = Highcharts.chart(chartElement, chartOptions);
        this.chartInstances[chartIndex].exporting.refresh();
        this.chartInstances[chartIndex].redraw();
      }
    }
  }

    formatValue(value: any): any {
      if (typeof value === 'number') {
        let formattedValue = value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        if (formattedValue.includes('.')) {
          formattedValue = formattedValue.replace(/,/g, '');
        }
        formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if (formattedValue.includes('.')) {
          formattedValue = formattedValue.substring(0, formattedValue.indexOf('.') + 3);
        }
        return formattedValue;
      } else {
        return value;
      }
    }

    openOrderDiag():void{
      const dialogRef = this.dialog.open(OrderFunctionComponent, {
        width: '350px', 
        data: {funcId: this.funcId}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit(); 
      });
    }
  
    exportXLSX(cols: any, rows: any, fileName: any) {
      const worksheetName = 'Sheet1';
      const worksheetData = cols.map((col: { [x: string]: any }, i: any) => {
        return rows.reduce((rowObj: { [x: string]: any }, rowName: string | number, j: string | number) => {
          rowObj[rowName] = col[j];
          return rowObj;
        }, {});
      });
      const worksheetColumns = rows;
    
      const sheet = XLSX.utils.json_to_sheet(worksheetData, { header: worksheetColumns }); // Create the sheet
    
      const headerCellStyle = {
        font: { bold: true },
        border: { bottom: { style: 'thin' } },
        fill: { type: 'pattern', pattern: 'solid', fgColor: { rgb: 'ECECEC' } }
      };
    
      const bodyCellStyle = {
        border: { bottom: { style: 'thin' } }
      };
    
      const sheetRange = XLSX.utils.decode_range(sheet['!ref'] || '');
      const { s: startCell, e: endCell } = sheetRange;
    
      for (let col = startCell.c; col <= endCell.c; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: startCell.r, c: col });
        const cell = sheet[cellAddress];
        if (cell && cell.t === 's' && cell.v) {
          cell.s = headerCellStyle; // Apply the style to the cell in the sheet
        }
      }
    
      const columnWidths = cols.map(() => ({ width: 10 }));
      worksheetData.forEach((rowData: any) => {
        Object.keys(rowData).forEach((key, index) => {
          const value = rowData[key];
          const contentLength = value ? String(value).length : 0;
          if (contentLength > columnWidths[index].width) {
            columnWidths[index].width = contentLength;
          }
        });
      });
    
      columnWidths.forEach((width: any, index: any) => {
        const column = XLSX.utils.encode_col(index);
        sheet['!cols'] = sheet['!cols'] || [];
        sheet['!cols'].push({ wch: width.width });
      });
    
      const range = `A1:${XLSX.utils.encode_col(worksheetColumns.length - 1)}${worksheetData.length + 1}`;
      sheet['!ref'] = range;
    
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, sheet, worksheetName); // Append the sheet to the workbook
      XLSX.writeFile(workbook, `${fileName}.xlsx`); // Save the workbook as an Excel file
    }
    

    onTableRowClick(rowData: any,id:any,rowIndex: number) {
      // Do something with the row data
     
      console.log('Clicked row data:', rowData,id);
      this.selectedRowIndex = rowIndex;
    
    }

    
    ngOnDestroy(): void {
      this.error = false;
      if (this.filtredSubscription) {
        this.filtredSubscription.unsubscribe();
      }
      this.d.unsubscribe()
      
    }

    @HostListener('window:resize')
  onWindowResize(): void {
    if (this.isChartDisplayed) {
      this.chartOptions.forEach((chart: any) => {
        console.log(chart)
        chart.reflow();
      });
    }
  }

  toggleBackgroundColor(): void {
    this.isDark = !this.isDark;
  
    // Define the text color based on the dark or light mode
    const textColor = this.isDark ? '#FFFFFF' : '#000000';
  
    // Update the background color and text color for all chartOptions
    this.chartOptions.forEach((chartOptions, chartIndex) => {
      const chartElement = document.getElementById(`chartc-${chartIndex}`);
      if (chartElement && chartOptions.chart) {
        chartOptions.chart.backgroundColor = this.isDark ? '#322E49' : '#FFFFFF';
        // Update the text color for title, subtitle, and legend
        if (chartOptions.title) {
        chartOptions.title.style = { color: textColor };
      }
      if (chartOptions.subtitle) {
        chartOptions.subtitle.style = { color: textColor };
      }
      if (chartOptions.legend) {
        chartOptions.legend.itemStyle = { color: textColor };
      }
      if(chartOptions.colorAxis){

      }
        // Destroy the existing chart instance
        const chartInstance = this.chartInstances[chartIndex];
        if (chartInstance) {
          chartInstance.destroy();
        }
  
        // Create a new Highcharts chart instance with the updated options
        this.chartInstances[chartIndex] = Highcharts.chart(chartElement, chartOptions);
        
      }
    });
  
    // Redraw the charts
    this.chartInstances.forEach((chartInstance) => {
      chartInstance.redraw();
    });
  }
  
  getFunctionName(){
    console.log(this.funcId)
    this.functionService.getFunctionById(this.funcId).subscribe((f:any)=>{
      this.funcName = f.functionName
      console.log(this.funcName)
      console.log(f)
    })
  }

  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
  }

  updateChartData(data: any[]): void {
    data.forEach((filteredChartData: { title: any; list_de_donnees: any[][]; }) => {
      filteredChartData.list_de_donnees = filteredChartData.list_de_donnees !== null ? filteredChartData.list_de_donnees : [];
      const existingChartData = this.chartData.find((chartData: { title: any; }) => chartData.title === filteredChartData.title);
      if (existingChartData) {
        existingChartData.list_de_donnees = filteredChartData.list_de_donnees;
      } else {
        this.chartData.push(filteredChartData);
      }
    });
  }
  

  replaceNumbersWithOperatorNames(data: any[]): Observable<any[]> {
    return this.chartService.getOperators().pipe(
      map((operatorList: any[]) => {
        data.forEach((chartData: any) => {
          if (chartData.operator === true) {
            chartData.list_de_donnees.forEach((row: any[]) => {
              const operatorId = parseInt(row[0], 10); // Convert ID to integer
              const operator = operatorList.find((operatorObj: any) => operatorObj.id === operatorId);
              if (operator) {
                row[0] = operator.operateur;
              }
            });
          }
        });
        console.log("Data after replacing numbers with operator names:", data);
        return data;
      }),
      catchError((error: any) => {
        console.log(error);
        return of(data); // Return the original data in case of an error
      })
    );
  }
  

    
}
