import { validateToken } from "@/_actions/auth.action";
import VerifyUserPage from "@repo/ui/verificationPage";
type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
async function VerificationPage(props: {
	params: Params;
	searchParams: SearchParams;
}) {
	const searchParam = await props.searchParams;
	const token = searchParam.token;
	const verifyAction = validateToken.bind(null, token);
	return (
		<>
			<VerifyUserPage verifyAction={verifyAction} />
		</>
	);
}

export default VerificationPage;
