import React from "react";
import SigninForm from "@repo/ui/signin";
import login from "@/_actions/login";
function LoginPage() {
	console.log("this is the page");
	return (
		<div>
			<SigninForm signinAction={login} />
		</div>
	);
}

export default LoginPage;
