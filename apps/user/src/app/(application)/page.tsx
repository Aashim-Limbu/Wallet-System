"use client";
import { useAppSelector } from "@repo/store/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function HomePage() {
	const account = useAppSelector((store) => store.account);
	usePathname;
	return (
		<>
			<h1>Hi from HomePage</h1>
			<p>
				Balance:
				{account.balance}
			</p>
			<Link href="/login">Login</Link>
		</>
	);
}

export default HomePage;
