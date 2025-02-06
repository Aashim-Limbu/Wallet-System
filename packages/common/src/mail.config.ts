"use server";
import send2FAEmailTemplate, { EmailTemplate } from "@repo/ui/emailTemplate";
import { Resend } from "resend";
export async function sendVerificationEmail(email: string, token: string) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const confirmLink = `http://localhost:3000/new-verification?token=${token}`;
  await resend.emails.send({
    from: "Aashim <aashimenterprise@resend.dev>",
    to: [email],
    subject: "Confirm your Email",
    react: EmailTemplate({ confirmLink, ButtonText: "Verify your Email" }),
  });
}
export async function sendResetPasswordEmail(email: string, token: string) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const confirmLink = `http://localhost:3000/new-password?token=${token}`;
  await resend.emails.send({
    from: "Aashim <aashimenterprise@resend.dev>",
    to: [email],
    subject: "Reset Password",
    react: EmailTemplate({ confirmLink, ButtonText: "Reset Email" }),
  });
}
export async function send2FATokenEmail(email: string, token: string) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: "Aashim <aashimenterprise@resend.dev>",
    to: [email],
    subject: "Reset Password",
    react: send2FAEmailTemplate({ verificationCode: token }),
  });
}
