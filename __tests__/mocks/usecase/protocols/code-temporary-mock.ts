import { ICodeTemporary } from 'src/data/protocols/code-temporary';

export const makeCodeTemporaryService = (): ICodeTemporary => {
  class CodeTemporaryServiceStub implements ICodeTemporary {
    generateCode(length?: number): string | Promise<string> {
      return '12345678';
    }
  }
  return new CodeTemporaryServiceStub();
};
