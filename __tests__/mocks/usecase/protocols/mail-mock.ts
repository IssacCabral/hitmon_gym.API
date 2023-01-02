import { IMail, SendEmailParams } from 'src/data/protocols/mail';

export const makeMailService = (): IMail => {
  class MailServiceStub implements IMail {
    sendEmail(sendEmailParams: SendEmailParams): Promise<void> {
      return Promise.resolve();
    }
  }
  return new MailServiceStub();
};
