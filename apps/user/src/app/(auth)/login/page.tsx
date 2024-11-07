import { login } from "@/_actions/auth.action";
import SigninForm from "@repo/ui/signin";
import React from "react";
type login = ReturnType<typeof login>;
function LoginPage() {
	return (
		<>
			<SigninForm signinAction={login} />
		</>
	);
}

export default LoginPage;
