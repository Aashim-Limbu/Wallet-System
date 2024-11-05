import { login } from "@/_actions/auth.action";
import SigninForm from "@repo/ui/signin";
import React from "react";
type login = typeof login;
function LoginPage() {
	return (
		<>
			<SigninForm signinAction={login} />
		</>
	);
}

export default LoginPage;
