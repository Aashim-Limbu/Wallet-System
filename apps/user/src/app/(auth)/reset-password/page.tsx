import { resetPassword } from "@/_actions/auth.action";
import ResetPassword from "@repo/ui/reset-page";
import React from "react";
function ResetPage() {
	return (
		<div className="h-full flex flex-col items-center justify-center">
			<ResetPassword resetAction={resetPassword} />
		</div>
	);
}

export default ResetPage;
