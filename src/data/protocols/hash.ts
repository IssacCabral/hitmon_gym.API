export interface IHash {
  generateHash(value: string): Promise<string>;
  compareHash(value: string, hashedValue: string): Promise<boolean>;
}
