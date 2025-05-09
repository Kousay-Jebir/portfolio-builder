import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user:`${process.env.EMAIL_USER}`,
        pass: `${process.env.EMAIL_PASS}`, 
      },
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: '"PortfolioBuilder Support" <chedli.masmoudi97@gmail.com>',
      to,
      subject,
      text,
    };

    return this.transporter.sendMail(mailOptions);
  }
}
