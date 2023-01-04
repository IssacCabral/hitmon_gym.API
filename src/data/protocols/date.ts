export interface IDate {
  subtractMinutes(date: Date, minutes: number): Date;
  addMinutes(date: Date, minutes: number): Date;
  checkIfBefore(date: Date, dateToCompare: Date): boolean;
  checkIfAfter(date: Date, dateToCompare: Date): boolean;
}
