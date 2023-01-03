export type SendEmailParams = {
  to: string;
  subject: string;
  body: any;
};

export interface IMail {
  sendEmail(sendEmailParams: SendEmailParams): Promise<void>;
}
