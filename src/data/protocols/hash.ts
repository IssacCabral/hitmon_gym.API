export interface IHash {
  generateHash(value: string): Promise<string>;
}
