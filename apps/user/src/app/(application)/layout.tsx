import NavBar from "@repo/ui/nav-bar";

import { Button } from "@repo/ui/button";
import React from "react";
import { ReactNode } from "react";

function ApplicationLayout({ children }: { children: ReactNode }) {
	return (
		<div className="w-full relative">
			<NavBar />
			{children}
		</div>
	);
}

export default ApplicationLayout;
