import { Component, OnInit } from '@angular/core';
import { ChartService } from 'src/app/services/chart.service';
import { CdrMscOcs } from 'src/model/CdrMscOCs';
import { IxInterResp } from 'src/model/IxInterResp';

@Component({
  selector: 'app-kpi-chart',
  templateUrl: './kpi-chart.component.html',
  styleUrls: ['./kpi-chart.component.css']
})
export class KpiChartComponent implements OnInit {
  constructor(private chartService: ChartService) {}
  cdrInfo: CdrMscOcs | undefined;

  ngOnInit(): void {
    this.chartService.getCdrsMSC().subscribe((data: CdrMscOcs) => {
      this.cdrInfo = data;
      console.log(this.cdrInfo)
    });
  }

  formatNumber(number: number): string {
    const numberString = number.toString();
    const formattedNumber = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return formattedNumber;
  }
}
