"use client";

import { ReactNode } from "react";

export default function SkeletonWrapper({ children }: { children: ReactNode }) {
	return (
		<div role="status" className="max-w-sm animate-pulse">
			{children}
			<span className="sr-only">Loading...</span>
		</div>
	);
}