"use client";
import { Button } from "@repo/ui/button";
import React, { useEffect } from "react";

export default function AuthErrorPage({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);
	return (
		<div>
			<h1>Something went wrong</h1>
			<Button variant="Primary" onClick={reset}>
				Retry
			</Button>
		</div>
	);
}
