import {Injectable} from '@angular/core';
import {DataPoint} from '../models/dataPoint';
import {parse} from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class CsvParserService {

  constructor() {
  }

  private parseDate(dateStr: string): Date {
    return parse(dateStr, 'dd/MM/yyyy HH:mm:ss.SSS', new Date());
  }

  parseCSV(file: File): Promise<DataPoint[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const csvData = reader.result as string;
        const csvRecordsArray = csvData.split(/\r\n|\n/);
        const headersRow = this.extractHeaderArray(csvRecordsArray);
        const dataPoints = this.extractDataRecords(csvRecordsArray, headersRow.length);
        resolve(dataPoints);
      };

      reader.onerror = (error) => {
        console.error('Error occurred while reading the file.', error);
        reject(error);
      };

      reader.readAsText(file);
    });
  }

  private extractDataRecords(csvRecordsArray: string[], headerLength: number): DataPoint[] {
    return csvRecordsArray.slice(1)
      .map(record => record.split(','))
      .filter(record => record.length === headerLength)
      .map(record => ({
        time: this.parseDate(record[0].trim()),
        quantity: parseInt(record[1].trim(), 10),
        price: parseFloat(record[2].trim()),
      } as DataPoint));
  }

  private extractHeaderArray(csvRecordsArray: string[]): string[] {
    return csvRecordsArray[0].split(',').map(header => header.trim());
  }
}
