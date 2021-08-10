import { SeatingPlan } from './seating.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SeatingService {
  constructor() {}

  generatePlan(
    names: string[],
    groupSize: number,
    switchEvery: number,
    totalWeeks: number
  ): SeatingPlan {
    const tempPlan: SeatingPlan = {
      weeks: [[[]]],
    };
    for (let i = 1; i < totalWeeks + 1; i += switchEvery) {
      const tempNames = [...names];

      if (!tempPlan.weeks[i]) {
        tempPlan.weeks[i] = [[]];
      }
      while (tempNames.length > 0) {
        tempPlan.weeks[i].push(this.pickGroup(tempNames, groupSize, tempPlan));
      }
      tempPlan.weeks[i].splice(0, 1);
    }
    tempPlan.weeks.splice(0, 1);
    return tempPlan;
  }

  pickGroup(
    names: string[],
    groupSize: number,
    tempPlan: SeatingPlan
  ): string[] {
    const pickedNames = [];
    if (names.length < groupSize) {
      return names.splice(0, names.length);
    }
    if (groupSize === 2) {
      pickedNames[0] = names.splice(this.getRandomIndex(names.length), 1);
      for (let i = 0; i < names.length; i++) {
        if (!this.checkGroup([pickedNames[0], names[i]], tempPlan)) {
          pickedNames[1] = names.splice(i, 1);
          break;
        }
      }
      // all possible groups have already been made so pick a random.
      if (pickedNames.length !== 2) {
        pickedNames[1] = names.splice(this.getRandomIndex(names.length), 1);
      }
      return pickedNames;
    } else {
      // if groups size > 3 the number of posibilities increase massively so just pick at random.
      // pick group to test
      const maxTries = 3000;
      let counter = 0;
      while (counter < maxTries) {
        const tempGroup = this.pickRandomGroupOfSize(groupSize, names);
        if (!this.checkGroup(tempGroup, tempPlan)) {
          return tempGroup;
        } else {
          names.push(...tempGroup);
        }
        counter++;
      }
      return this.pickRandomGroupOfSize(groupSize, names);
    }
  }

  /**
   * Returns true if the seating plan already contains the group in question.
   * @param group the group to check if exists in the current seating plan.
   * @param tempPlan The seating plan to check
   */
  checkGroup(group: string[], tempPlan: SeatingPlan): boolean {
    for (let week of tempPlan.weeks) {
      if (week) {
        for (let tempGroup of week) {
          if (group.sort().join() === tempGroup.sort().join()) {
            return true;
          }
        }
      }
    }
    return false;
  }

  pickRandomGroupOfSize(groupSize: number, names: string[]): string[] {
    const pickedNames = [];
    if (groupSize > names.length) {
      return names.splice(0, names.length);
    }

    while (pickedNames.length < groupSize) {
      pickedNames.push(names.splice(this.getRandomIndex(names.length), 1));
    }

    return pickedNames;
  }

  getRandomIndex(arrayLength: number): number {
    return Math.floor(Math.random() * arrayLength);
  }
}

export interface SeatingPlan {
  weeks: [[string[]]];
}
