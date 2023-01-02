export interface IMail {
  sendEmail(to: string, subject: string, body: any): Promise<void>;
}
