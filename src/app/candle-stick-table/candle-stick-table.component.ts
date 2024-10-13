import {Component, OnInit} from '@angular/core';
import {CandleStickPoint} from '../models/candleStickPoint';
import {SharedService} from '../services/shared.service';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {CurrencyPipe, DatePipe, NgClass} from '@angular/common';

@Component({
  selector: 'app-candle-stick-table',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatRow,
    MatHeaderRow,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    DatePipe,
    CurrencyPipe,
    NgClass
  ],
  templateUrl: './candle-stick-table.component.html',
  styleUrl: './candle-stick-table.component.css'
})
export class CandleStickTableComponent implements OnInit {
  public candleStickData: CandleStickPoint[] = []
  displayedColumns: string[] = ['time', 'open', 'close', 'high', 'low', 'sumVolume'];

  constructor(private sharedService: SharedService) {
  }

  ngOnInit() {
    this.sharedService.currentData.subscribe((message) => {
      this.candleStickData = message;
    });
  }
}
