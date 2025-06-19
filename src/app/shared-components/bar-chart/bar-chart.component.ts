import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
,
  standalone: false})
export class BarChartComponent implements OnChanges{

  @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;
  
  @Input() data?: Array<number>
  @Input() labels?: Array<string>

  dataSet: any = { data: [65, 59, 80, 81, 56, 55, 40], label: 'Ventas', backgroundColor: '#F85A3E', borderColor: "#F85A3E" }

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['labels'] && this.labels){
      this.barChartData.labels = this.labels;
      this.chart?.update();
    }
    
    if(changes['data'] && this.data){
      this.dataSet.data = this.data;
      this.chart?.update();
    } 
  }

  setdata() {}

  options : ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  }
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    ...this.options,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      
    },
  };
  public barChartType = 'bar' as const;

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      this.dataSet
      
    ],
  };

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40,
    ];

    this.chart?.update();
  }
}
