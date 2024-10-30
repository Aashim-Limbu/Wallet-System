"use client";
import Button from "./button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import NextImage from "next/image";
import Ethereum from "../assets/ethereum-svgrepo-com.svg";
function NavBar() {
	const router = useRouter();
	return (
		<nav className="flex items-center px-2 py-2 max-h-16 container mx-auto">
			<div className="flex items-center justify-between flex-1">
				<div className="flex items-center  gap-x-2">
					<NextImage
						className="m-0"
						src={Ethereum}
						width={40}
						height={40}
						alt="Logo"
					/>
					<span className="font-semibold text-xl">Ethereum Exchange</span>
				</div>
				<div className="flex gap-x-4">
					<Button variant="secondary" onClick={() => router.push("/signup")}>
						Sign up
					</Button>
					<Button onClick={() => signIn()} variant="primary">
						Sign in
					</Button>
				</div>
			</div>
		</nav>
	);
}

export default NavBar;
