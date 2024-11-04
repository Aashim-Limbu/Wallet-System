import { login } from "@/_actions/auth.action";
import SigninForm from "@repo/ui/signin";
import React from "react";
function LoginPage() {
	return (
		<>
			<SigninForm signinAction={login} />
		</>
	);
}

export default LoginPage;
