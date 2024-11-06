import { changePassword } from "@/_actions/auth.action";
import ResetPasswordForm from "@repo/ui/reset-password-form";
export default function ResetPasswordPage() {
	return (
		<>
			<ResetPasswordForm  changePassword={changePassword}/>
		</>
	);
}
