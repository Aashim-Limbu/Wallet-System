// import { NavBar } from "@repo/ui/nav-bar";

import { Button } from "@repo/ui/button";
import React from "react";
import { ReactNode } from "react";

function ApplicationLayout({ children }: { children: ReactNode }) {
	return (
		<div className="w-full relative">
			{/* <NavBar /> */}
			<Button appName="User">Click Me</Button>
			{children}
		</div>
	);
}

export default ApplicationLayout;
