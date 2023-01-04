import { IDate } from '@data/protocols/date';
import { Injectable } from '@nestjs/common';
import * as moment from 'moment';

@Injectable()
export class MomentAdapter implements IDate {
  checkIfAfter(date: Date, dateToCompare: Date): boolean {
    return moment(date).isAfter(dateToCompare);
  }

  addMinutes(date: Date, minutes: number): Date {
    return moment(date).add(minutes, 'minutes').toDate();
  }

  subtractMinutes(date: Date, minutes: number): Date {
    return moment(date).subtract(minutes, 'minutes').toDate();
  }

  checkIfBefore(date: Date, dateToCompare: Date): boolean {
    return moment(date).isBefore(dateToCompare);
  }
}
