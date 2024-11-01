"use client";
import { useAppSelector } from "@repo/store/hooks";
import React from "react";

function HomePage() {
	const account = useAppSelector((store) => store.account);
	return (
		<>
			<h1>Hi from HomePage</h1>
			<p>
				Balance:
				{account.balance}
			</p>
		</>
	);
}

export default HomePage;
