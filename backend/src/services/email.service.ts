import nodemailer from "nodemailer";
import { injectable } from "tsyringe";
import { IEmailService } from "./email-service.interface";

@injectable()
export default class EmailService implements IEmailService {
  private transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  async sendPasswordReset(email: string, token: string): Promise<void> {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    await this.transporter.sendMail({
      from: `"ICPP 2026" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Reset your password",
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: auto;">
          <h2>Reset your password</h2>
          <p>Click the link below to reset your password. This link expires in 1 hour.</p>
          <a href="${resetUrl}" style="
            display: inline-block;
            padding: 12px 24px;
            background-color: #4F46E5;
            color: white;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
          ">
            Reset Password
          </a>
          <p style="margin-top: 16px; color: #999;">If you didn't request this, ignore this email.</p>
        </div>
      `,
    });
  }
}
