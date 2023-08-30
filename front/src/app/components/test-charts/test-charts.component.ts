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
import { Chart } from 'highcharts';

import { ViewChild } from '@angular/core';
import { data } from 'jquery';
import { Subscription } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { HighchartsChartComponent } from 'highcharts-angular';

Accessibility(Highcharts)
ExportingModule(Highcharts);
HC_exportData(Highcharts);
@Component({
  selector: 'app-test-charts',
  templateUrl: './test-charts.component.html',
  styleUrls: ['./test-charts.component.css']
})
export class TestChartsComponent implements OnInit{
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatPaginator) paginators = new QueryList<MatPaginator>();
  dataSources: MatTableDataSource<any>[] = [];
  
  highcharts = Highcharts;
  chartOptions: Highcharts.Options[] = [];
  chart: Highcharts.Chart | null | undefined;
  chartData:any[] = [];
  funcId : any;
  user!:User;
  newuser!:User;
  highchartsTypes = HIGHCHARTS_TYPES
  isLoading: boolean = false;
  reports: any;
  pageSizeOptions = [2,5, 10, 25, 100];
  isChartDisplayed = false;
  constructor(private chartService:ChartService,
              private route: ActivatedRoute,
              private router:Router,
              public dialog: MatDialog,
              private userService:UserService,
              private service:AuthService,
              private toastr: ToastrService,
              private loaderService:LoaderService,
              private functionService:FunctionService,
              private changeDetectorRef: ChangeDetectorRef){}


              ngOnInit(){
                this.loaderService.show();  
                //this.funcId = 277       
                 this.chartService.getTestCharts().subscribe((data:any)=>{
                    if(data){
                      this.chartData = data
                      this.buildChart(this.chartData)
                    }else{
                      this.chartOptions = [];
                    }
                    this.loaderService.hide();
                  },
                  (error: any) => {
                    console.log(error);
                    this.loaderService.hide();
                  });
                }
              
            
              buildChart(data:any[]):any{
                this.loaderService.show();
                this.loaderService.isLoading$.subscribe(isLoading => this.isLoading = isLoading);
                console.log(this.chartData)
                this.chartOptions = [];
                data.forEach((chartData: { listnamerep: any[]; list_de_donnees: any[][]; title: any; listnamereptab: any[]; chart_type: any; }) => {
            
                  const seriesData = chartData.listnamerep.slice(0).map((name: any, i: number) => ({
                    name: name,
                    data: chartData.list_de_donnees.map((data: { toString: () => any; }[]) => data[i+1]),
                  }));
                  
                  
                  let subtitleText = chartData.title.split()[0] + ': ';
                  if (chartData.list_de_donnees.length === 1) {
                    subtitleText += 'Date: ' + chartData.list_de_donnees[0][0];
                  } else if (chartData.list_de_donnees.length >= 2) {
                    subtitleText += 'Between ' + chartData.list_de_donnees[0][0] + ' and ' + chartData.list_de_donnees[chartData.list_de_donnees.length - 1][0];
                  }
                  this.chartOptions.push({
                    credits: {
                      enabled: false
                  },
                    chart: {
                      type: chartData.chart_type,
                      height: '40%'
                  },
                  title: {
                    text: chartData.title.split()[0] + '<br><hr style="height:2px;color:white;background-color:gray">',
                    align: 'left',
                    useHTML: true,
                    style: {
                      fontWeight: 'bold',
                      fontSize: '16px',
                      minWidth : '90%'
                    }
                  },
                  subtitle: {
                    text: chartData.title.split()[0] + ': ' + subtitleText,
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
                        // text: chartData.listnamereptab[0]
                        text : "Values"
                      }
                    },
                    legend: {
                      enabled: true
                    },
                    exporting: {
                      enabled: true,
                      menuItemDefinitions: {
                        viewData: {
                          text: 'View Data Table',
                          onclick: () => this.openDialog(chartData.list_de_donnees,chartData.listnamereptab)
                        }
                      },
                      buttons: {
                        contextButton: {
                          menuItems: ['viewData','viewFullscreen' ,'separator', 'downloadPNG', 'downloadPDF', 'downloadSVG','downloadCSV']
                        }
                      }
                    },        
                  tooltip:{
                    valueDecimals : 1
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
                    })) as SeriesOptionsType[],
                  });
                  
                })
                this.changeDetectorRef.detectChanges();
                this.loaderService.hide();
                this.isChartDisplayed = true;
                return this.chartOptions
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

}
