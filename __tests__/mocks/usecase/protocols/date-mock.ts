import { IDate } from '@data/protocols/date';

export const makeDateService = (): IDate => {
  class DateServiceStub implements IDate {
    subtractMinutes(date: Date, minutes: number): Date {
      return new Date();
    }
    addMinutes(date: Date, minutes: number): Date {
      return new Date();
    }
    checkIfBefore(date: Date, dateToCompare: Date): boolean {
      return true;
    }
    checkIfAfter(date: Date, dateToCompare: Date): boolean {
      return true;
    }
  }

  return new DateServiceStub();
};
