import { SeatingService } from './seating.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Siddeplan';
  groupSize: number = 2;
  switchEvery: number = 1;
  totalWeeks: number = 34;
  namelist: string = '';

  constructor(private ss: SeatingService) {
    console.log('loaded');
  }
  generateSeatingPlan() {
    const plan = this.ss
      .generatePlan(
        this.namelist.split('\n'),
        this.groupSize,
        this.switchEvery,
        this.totalWeeks
      )
      .weeks.filter((week) => week !== undefined);

    for (let week of plan) {
      console.log(week);
    }
  }
}
