import { IMail, SendEmailParams } from '@data/protocols/mail';
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import { env } from 'process';
import * as ejs from 'ejs';

const mailerTransporter: Transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: Number(env.SMTP_PORT),
  secure: false,
  auth: {
    user: env.SMTP_USERNAME,
    pass: env.SMTP_PASSWORD,
  },
});

@Injectable()
export class NodeMailerAdapter implements IMail {
  async sendEmail(sendEmailParams: SendEmailParams): Promise<void> {
    const templateMail = await ejs.renderFile(
      'views/mails/confirm-account.ejs',
      { code: sendEmailParams.body.code },
    );
    await mailerTransporter.sendMail({
      from: env.SMTP_FROM,
      to: sendEmailParams.to,
      subject: sendEmailParams.subject,
      html: templateMail,
    });
    console.log(
      `a new email ${sendEmailParams.subject} has been sent to ${sendEmailParams.to}`,
    );
  }
}
