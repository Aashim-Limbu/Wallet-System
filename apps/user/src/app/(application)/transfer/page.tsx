import React from "react";
import { auth } from "@/auth";
async function AccountPage() {
	const session = await auth();
	return (
		<div>
			<h1>AccountPage</h1>
			<div>{JSON.stringify(session)}</div>
		</div>
	);
}

export default AccountPage;
