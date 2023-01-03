export interface ICodeTemporary {
  generateCode(length?: number): Promise<string> | string;
}
