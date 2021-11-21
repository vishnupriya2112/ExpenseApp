import { Component, OnInit, Input } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { RequestService } from 'src/app/shared/service/request.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  @Input() data:any=[];
  @Input() item:any=[];
  @Input() color:any=[];
  
  public pieChartOptions: ChartOptions = {
    responsive: true,
     maintainAspectRatio: false
  };
  public pieChartLabels: Label[];
  public pieChartData: SingleDataSet;
  public pieChartType: ChartType = 'doughnut';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColor = [{backgroundColor: []}];

  constructor(private requestService:RequestService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    // this.pieChartLabels=[];
    // this.pieChartData=[];
    console.log(this.data);
    this.pieChartData=this.data;
    //console.log(this.data.amount);
    this.pieChartLabels=this.item;
    //console.log(this.data.title);
    this.pieChartColor[0].backgroundColor=this.color;
  }

  

}
