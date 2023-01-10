export interface IJwt {
  sign(payload: any): Promise<string>;
  verify(payload: string): Promise<any>;
}
