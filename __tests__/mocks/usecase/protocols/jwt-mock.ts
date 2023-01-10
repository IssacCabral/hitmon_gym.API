import { IJwt } from '@data/protocols/jwt';

export const makeJwtService = (): IJwt => {
  class JwtServiceStub implements IJwt {
    sign(payload: any): Promise<string> {
      return Promise.resolve('access_token');
    }
    verify(payload: string): Promise<any> {
      return Promise.resolve();
    }
  }
  return new JwtServiceStub();
};
