import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Product } from '../../core/entities/product';

@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnChanges{
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  @Input() brief? : Array<{product: Product, quantity: number}>

  constructor(
    private breakpointObserver: BreakpointObserver
  ){
    this.breakpointObserver.observe(['(max-width: 600px)']).subscribe((res: BreakpointState) => {
      this.chart?.chart?.render()
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['brief'] && this.brief){
      let labels :string[] = [];
      let data: number[] = [];
      for(let item of this.brief){
        labels.push(item.product.name);
        data.push(item.quantity);
      }
      this.pieChartData.labels = labels;
      this.pieChartData.datasets[0].data = data;
      this.chart?.update()
    }
  }

  config : ChartOptions = {
    maintainAspectRatio: false,
    responsive: true
  }
  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {

    ...this.config,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value : any, ctx : any) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
          return '';
        },
      },
    },
    
  } as any;
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'],
    datasets: [
      {
        data: [300, 500, 100],
      },
    ],
  };
  public pieChartType: ChartType = 'pie';

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
  }

}
