import {Component, OnInit} from '@angular/core';
import {CandleStickPoint} from '../models/candleStickPoint';
import {ApexAxisChartSeries, ApexChart, ApexTitleSubtitle, ApexXAxis, ApexYAxis, ChartComponent} from 'ng-apexcharts';
import {SharedService} from '../services/shared.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-candle-stick-chart',
  standalone: true,
  imports: [
    ChartComponent
  ],
  templateUrl: './candle-stick-chart.component.html',
  styleUrls: ['./candle-stick-chart.component.css']
})
export class CandleStickChartComponent implements OnInit {
  protected chartOptions: Partial<ChartOptions>;
  protected hasData: boolean = false;

  constructor(private sharedService: SharedService) {
    this.chartOptions = {
      series: [
        {
          name: 'candle',
          data: []
        }
      ],
      chart: {
        type: 'candlestick',
        height: 350,
        zoom: {
          enabled: false
        }
      },
      title: {
        text: 'CandleStick Chart',
        align: 'left'
      },
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      },

    };

  }

  ngOnInit() {
    this.subscribeToCandleStickData();
  }

  private subscribeToCandleStickData() {
    this.sharedService.currentData.subscribe((candleStickData: CandleStickPoint[]) => {
      this.updateChartData(candleStickData);
    });
  }

  private updateChartData(candleStickData: CandleStickPoint[]) {
    const transformedData = candleStickData.map(this.transformToCandleStickPoint);
    this.chartOptions.series = [{name: 'candle', data: transformedData}];
    this.hasData = transformedData.length > 0;
  }

  private transformToCandleStickPoint(candleStick: CandleStickPoint) {
    return {
      x: new Date(candleStick.time),
      y: [candleStick.open, candleStick.high, candleStick.low, candleStick.close]
    };
  }

}
