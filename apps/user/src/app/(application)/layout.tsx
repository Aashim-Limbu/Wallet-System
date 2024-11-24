import SideBar from "@repo/ui/sidebar-Layout"
import React from "react";
import { ReactNode } from "react";

function ApplicationLayout({ children }: { children: ReactNode }) {
	return (
		<div className="w-full flex flex-col h-full">
			<SideBar>{children}</SideBar>
		</div>
	);
}

export default ApplicationLayout;
