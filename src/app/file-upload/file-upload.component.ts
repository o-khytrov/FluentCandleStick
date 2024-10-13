import {Component, ViewChild} from '@angular/core';
import {SharedService} from '../services/shared.service';
import {MatButton, MatMiniFabButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {CsvParserService} from '../services/csvParser.service';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  templateUrl: './file-upload.component.html',
  imports: [
    MatButton,
    MatTooltip,
    MatIcon,
    MatMiniFabButton
  ],
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  constructor(private sharedService: SharedService, private csvParser: CsvParserService) {
  }

  fileName = '';
  @ViewChild('csvReader') csvReader: any;

  uploadListener(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];

    if (file && this.isCSVFile(file)) {
      this.fileName = file.name;
      this.parseCSVFile(file);
    } else {
      alert('Please import a valid .csv file.');
      this.resetFileInput();
    }
  }

  private parseCSVFile(file: File): void {
    this.csvParser.parseCSV(file).then(dataPoints => {
      this.sharedService.setDataPoints(dataPoints);
    }).catch(error => {
      console.error('Error occurred while parsing the file:', error);
    });
  }

  private isCSVFile(file: File): boolean {
    return file.name.endsWith('.csv');
  }

  private resetFileInput(): void {
    this.csvReader.nativeElement.value = '';
  }
}
