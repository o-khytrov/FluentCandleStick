import {DataPoint} from '../models/dataPoint';
import {CandleStickPoint} from '../models/candleStickPoint';
import {compareAsc} from 'date-fns';

export class CandleStickDataConverter {
  private data: DataPoint[];

  constructor(data: DataPoint[]) {
    this.data = data;
  }


  private groupDataByMinute(): { [key: string]: DataPoint[] } {
    return this.data.reduce((acc: { [key: string]: DataPoint[] }, item: DataPoint) => {
      const date = item.time;


      const minuteKey = date.toISOString().substring(0, 16);

      if (!acc[minuteKey]) {
        acc[minuteKey] = [];
      }

      acc[minuteKey].push(item);
      return acc;
    }, {});
  }

  public calculateCandleSticks(): CandleStickPoint[] {
    const groupedByMinute = this.groupDataByMinute();

    const candles = Object.keys(groupedByMinute).map((minute: string) => {
      const minuteData = groupedByMinute[minute];

      const open = minuteData[0].price;
      const close = minuteData[minuteData.length - 1].price;
      const high = Math.max(...minuteData.map(item => item.price));
      const low = Math.min(...minuteData.map(item => item.price));
      const sumVolume = minuteData.reduce((sum, item) => sum + item.quantity, 0);

      return {
        time: new Date(minute),
        open,
        close,
        high,
        low,
        sumVolume
      };
    });

    candles.sort((a, b) => {

      return compareAsc(a.time, b.time); // Sorting by time
    });

    return candles;
  }
}
