export type SendEmailParams = {
  to: string;
  subject: string;
  body: {
    template: string;
  };
};

export interface IMail {
  sendEmail(sendEmailParams: SendEmailParams): Promise<void>;
}
