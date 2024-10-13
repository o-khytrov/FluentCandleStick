import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandleStickTableComponent } from './candle-stick-table.component';

describe('CandleStickTableComponent', () => {
  let component: CandleStickTableComponent;
  let fixture: ComponentFixture<CandleStickTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandleStickTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandleStickTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
