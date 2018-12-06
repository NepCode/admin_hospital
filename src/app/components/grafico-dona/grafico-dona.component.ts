import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  // Doughnut
 /*  @Input()  doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input()  doughnutChartData:number[] = [350, 450, 100];
  @Input()  doughnutChartType:string = 'doughnut';  */

  @Input()  doughnutChartLabels:string[] = [''];
  @Input()  doughnutChartData:number[] = [];
  @Input()  doughnutChartType:string = ''; 

  @Input('graficos') graficos: any = {};

  constructor() { }

  ngOnInit() {
  }

}
