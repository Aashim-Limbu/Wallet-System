import React from "react";
import SigninForm from "@repo/ui/signin";
import login from "@/app/_actions/login";
function LoginPage() {
	return (
		<div>
			<SigninForm signinAction={login} />
		</div>
	);
}

export default LoginPage;
