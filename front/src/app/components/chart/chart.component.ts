import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import Accessibility from 'highcharts/modules/accessibility';
import ExportingModule from 'highcharts/modules/exporting';
import type { SeriesOptionsType } from 'highcharts';
import { AuthService } from 'src/app/services/auth.service';
import { ChartService } from 'src/app/services/chart.service';
import { User } from 'src/model/User';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { TableDialogComponent } from '../table-dialog/table-dialog.component';
import { FilterType } from 'src/model/FilterType';
import { Filters } from 'src/model/Filters';
import { HIGHCHARTS_TYPES } from 'src/model/HIGHCHARTS_TYPES';
import { LoaderService } from 'src/app/services/loader.service';
import { FilterService } from 'src/app/services/filter.service';
import { OrderUserChartsComponent } from '../order-user-charts/order-user-charts.component';
import * as XLSX from 'xlsx';
import { Subscription } from 'rxjs';
import { HighchartsChartComponent } from 'highcharts-angular';
import { Chart } from 'highcharts';
import { Cdr } from 'src/model/Cdr';


Accessibility(Highcharts)
ExportingModule(Highcharts);
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  selectedRowIndex = -1
  @ViewChild('chart', { static: false })
  private chartComponent!: HighchartsChartComponent;
  private chartInstance!: Chart;
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
  myUser!:User;
  isTable:boolean=false;
  isDark:boolean=false;
  backgroundColor: string = '#322E49';
  isChartDisplayed = false;
  private filtredSubscription!: Subscription;
  private d!: Subscription;

  constructor(private userService:AuthService,
              private chartService:ChartService,
              public dialog: MatDialog,
              private service:UserService,
              private loaderService:LoaderService,
              private filterService:FilterService,
              private changeDetectorRef: ChangeDetectorRef){}

  user!: User
  highcharts = Highcharts;
  chartOptions: Highcharts.Options[] = [];
  chartData:any[] = [];
  chartInstances: any[] = [];
  //cdrInfo!:Cdr;
  ngOnInit(): void {
    // this.chartService.getCdrsInfo().subscribe((data:Cdr)=>{
    //   this.cdrInfo = data;
    // })
    this.loaderService.show();
    this.userService.getUser().subscribe((user:User)=>{
      this.filtredSubscription = this.filterService.filtredUpdatedChart.subscribe((filtred) => {
        this.filtred = filtred;
        this.filtred.idfunction = user.uId;
        
        console.log('filtred', this.filtred); // <-- console log the updated filtred object
        // do whatever you want with the updated filtred object
        if(this.filtred.isVaration === false && this.filtred.isPerHour === false){
          this.chartService.getFunctionChartFiltredForUser(filtred).subscribe((data:any)=>{
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
        }if(this.filtred.isPerHour && this.filtred.startHour!=null && this.filtred.endHour!=null){
          this.filtred.type_Filter = this.filterType.Custom
          this.chartService.getFunctionChartFiltredForUserPerHours(filtred).subscribe((data:any)=>{
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
        }if(this.filtred.isVaration){
          // this.chartService.getFunctionChartVariationForUser(filtred).subscribe((data:any)=>{
          //   if(data){
          //     // filter the data array to keep only non-null variables
          //     const filteredData = data.filter((chartData: { list_de_donnees: any[][]; }) => chartData.list_de_donnees.every(row => row.every(val => val !== null)));
              
          //     // update chartData with the filtered data
          //     filteredData.forEach((filteredChartData: { title: any; list_de_donnees: any[][]; }) => {
          //       filteredChartData.list_de_donnees = filteredChartData.list_de_donnees !== null ? filteredChartData.list_de_donnees : [];
          //       const existingChartData = this.chartData.find((chartData: { title: any; }) => chartData.title === filteredChartData.title);
          //       if (existingChartData) {
          //         existingChartData.list_de_donnees = filteredChartData.list_de_donnees;
          //       } else {
          //         this.chartData.push(filteredChartData);
          //       }
          //     });
          //     this.buildChart(this.chartData);
          //   } else {
          //     this.chartOptions = [];
          //   }
          // },
          // (error: any) => {
          //   console.log(error);
          // });
          this.chartService.getFunctionChartVariationForUser(filtred).subscribe((data: any) => {
            if (data) {
              const filteredData = data.map((chartData: any) => {
                const filteredList = chartData.list_de_donnees.filter((row: any[]) => row.some((val: any) => val !== null));
                return {
                  ...chartData,
                  list_de_donnees: filteredList,
                };
              });
          
              filteredData.forEach((filteredChartData: any) => {
                const existingChartData = this.chartData.find((chartData: any) => chartData.title === filteredChartData.title);
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
          
        }
        
      });


      //initail load chart for user
      this.user = user
      this.chartService.getChart(this.user.uId).subscribe((data:any)=>{
          this.chartData = data
          console.log(data)
          this.buildChart(this.chartData)
          this.loaderService.hide();
          },
              (error: any) => {
                console.log(error);
                }
              )
              this.loaderService.hide();
              
    },(error: any) => {
      console.log(error);
      this.loaderService.hide();
    }
    )
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



  removeFromDashboard(id:any){
    this.service.removeFromDashboard(this.user?.uId,id).subscribe(() => {
      this.chartOptions = []; // clear existing chart options
      this.chartService.getChart(this.user.uId).subscribe((data:any)=>{
      this.chartData = data;
      this.buildChart(this.chartData);
    });
    });
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
  const dialogRef = this.dialog.open(OrderUserChartsComponent, {
    width: '350px', 
    data: {userId: this.user.uId}
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

ngOnDestroy(): void {
  this.filtredSubscription.unsubscribe();
}


ngAfterViewInit() {
  this.changeDetectorRef.detectChanges();
}



}
