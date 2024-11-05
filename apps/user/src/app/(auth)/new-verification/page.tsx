import { validateToken } from "@/_actions/auth.action";
import VerifyUserPage from "@repo/ui/verificationPage";
async function VerificationPage() {
	return (
		<>
			<VerifyUserPage verifyAction={validateToken} />
		</>
	);
}

export default VerificationPage;
