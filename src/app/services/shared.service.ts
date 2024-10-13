import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {CandleStickPoint} from '../models/candleStickPoint';
import {DataPoint} from '../models/dataPoint';
import {CandleStickDataConverter} from './candleStickDataConverter';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private messageSource = new BehaviorSubject<CandleStickPoint[]>([]);
  currentData = this.messageSource.asObservable();

  constructor() {
  }

  public setDataPoints(dataPoints: DataPoint[]) {
    const candleSticks = new CandleStickDataConverter(dataPoints).calculateCandleSticks();
    this.messageSource.next(candleSticks);
  }
}
