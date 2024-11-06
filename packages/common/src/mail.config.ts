import { EmailTemplate } from "@repo/ui/emailTemplate";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
export async function sendVerificationEmail(email: string, token: string) {
	const confirmLink = `http://localhost:3000/new-verification?token=${token}`;
	await resend.emails.send({
		from: "Aashim <aashimenterprise@resend.dev>",
		to: [email],
		subject: "Confirm your Email",
		react: EmailTemplate({ confirmLink }),
	});
}
export async function sendResetPasswordEmail(email: string, token: string) {
	const confirmLink = `http://localhost:3000/new-password?token=${token}`;
	await resend.emails.send({
		from: "Aashim <aashimenterprise@resend.dev>",
		to: [email],
		subject: "Reset Password",
		react: EmailTemplate({ confirmLink }),
	});
}
