import React from "react";
import LoginForm from "@repo/ui/signup";
import { registerUser } from "@/app/_actions/registerAction";

function SignupPage() {
	return (
		<>
			<LoginForm registerUser={registerUser} />
		</>
	);
}

export default SignupPage;
