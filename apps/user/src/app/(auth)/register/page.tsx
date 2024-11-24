import React from "react";
import LoginForm from "@repo/ui/signup";
import { registerUser } from "@/_actions/auth.action";

function SignupPage() {
	return (
		<>
			<LoginForm registerUser={registerUser} />
		</>
	);
}

export default SignupPage;
