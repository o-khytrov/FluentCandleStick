import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

import {CandleStickChartComponent} from './candle-stick-chart/candle-stick-chart.component';
import {CandleStickTableComponent} from './candle-stick-table/candle-stick-table.component';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {HeaderComponent} from './header/header.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CandleStickChartComponent, CandleStickTableComponent, FileUploadComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FluentCandleStick';

}
