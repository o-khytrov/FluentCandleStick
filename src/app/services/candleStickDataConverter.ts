import {DataPoint} from '../models/dataPoint';
import {CandleStickPoint} from '../models/candleStickPoint';
import {compareAsc, startOfDay, startOfHour, startOfMinute} from 'date-fns';

export enum TimeInterval {
  Minute = 'minute',
  Hour = 'hour',
  Day = 'day'
}

export class CandleStickDataConverter {
  private data: DataPoint[];
  private interval: TimeInterval;

  constructor(data: DataPoint[], interval: TimeInterval = TimeInterval.Minute) {
    this.data = data;
    this.interval = interval;
  }

  private getTimeKey(date: Date): Date {
    switch (this.interval) {
      case TimeInterval.Hour:
        return startOfHour(date);
      case TimeInterval.Day:
        return startOfDay(date);
      case TimeInterval.Minute:
      default:
        return startOfMinute(date);
    }
  }

  private groupDataByInterval(): Map<string, DataPoint[]> {
    return this.data.reduce((acc: Map<string, DataPoint[]>, item: DataPoint) => {
      const timeKey = this.getTimeKey(item.time).toISOString();

      if (!acc.has(timeKey)) {
        acc.set(timeKey, []);
      }

      acc.get(timeKey)?.push(item);
      return acc;
    }, new Map<string, DataPoint[]>());
  }

  public calculateCandleSticks(): CandleStickPoint[] {
    const groupedByInterval = this.groupDataByInterval();


    const candles = Array.from(groupedByInterval.entries()).map(([intervalKey, intervalData]) => {
      // Sort the data points in each interval by time to ensure correct order
      const sortedIntervalData = intervalData.sort((a, b) => compareAsc(a.time, b.time));

      const open = sortedIntervalData[0].price;
      const close = sortedIntervalData[sortedIntervalData.length - 1].price;
      const high = Math.max(...sortedIntervalData.map(item => item.price));
      const low = Math.min(...sortedIntervalData.map(item => item.price));
      const sumVolume = sortedIntervalData.reduce((sum, item) => sum + item.quantity, 0);

      return {
        time: new Date(intervalKey),
        open,
        close,
        high,
        low,
        sumVolume
      };
    });

    candles.sort((a, b) => compareAsc(a.time, b.time)); // Sorting by time
    return candles;
  }
}
