import { IMail } from 'src/data/protocols/mail';

export const makeMailService = (): IMail => {
  class MailServiceStub implements IMail {
    sendEmail(to: string, subject: string, body: any): Promise<void> {
      return Promise.resolve();
    }
  }
  return new MailServiceStub();
};
