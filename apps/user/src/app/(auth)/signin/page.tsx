import Button from "@repo/ui/button";
import Github from "../../assets/icons8-github.svg";
import Google from "../../assets/icons8-google.svg";
import Ethereum from "../../assets/ethereum-svgrepo-com.svg";
import Image from "next/image";
import React from "react";
import Link from "next/link";
export default function SigninPage() {
	return (
		<div className="h-full flex flex-col items-center justify-center">
			<div className="mx-auto sm:w-full sm:max-w-sm md:max-w-md mt-8 bg-white rounded-lg shadow-lg px-6 py-4">
				<div className="mx-auto sm:max-w-sm md:max-w-md">
					<div>
						<Image
							className="mx-auto"
							src={Ethereum}
							height={50}
							width={50}
							alt="Ethereum Logo"
						/>
					</div>
					<p className="text-center text-xl font-bold tracking-tighter">
						Sign in to your Account
					</p>
				</div>
				<form className="space-y-6">
					<label
						htmlFor="email"
						className="block text-sm leading-5 text-gray-900 font-semibold"
					>
						Email:
					</label>
					<div className="mt-2">
						<input
							type="email"
							className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
							name="email"
						/>
					</div>
					<label
						className="block text-sm leading-5 text-gray-900 font-semibold"
						htmlFor="password"
					>
						Password:
					</label>
					<div>
						<input
							className="ring-1 w-full ring-inset ring-gray-300 py-1.5 rounded-md  border-0 block text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 "
							type="password"
							name="password"
						/>
					</div>
					<div className="flex flex-between">
						<div className="inline-flex flex-1 gap-x-2  items-center">
							<input type="checkbox" name="checkbox" />
							<span className="text-sm font-semibold text-gray-600 tracking-tight leading-5">
								Remember me
							</span>
						</div>
						<span className="font-semibold text-sm text-indigo-700">
							Forgot Password?
						</span>
					</div>
					<div className="sm:w-full sm:max-w-sm md:max-w-md">
						<Button type="submit" className="w-full" variant="primary">
							Login
						</Button>
					</div>
				</form>
				<div className="mt-6">
					<div className="bg-gray-600 w-full h-0.5">
						<div className="absolute left-1/2 bg-white p-1.5 font-semibold -translate-y-1/2 -translate-x-1/2">
							Or Continue with
						</div>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-x-10 mt-6 px-4">
					<button className="inline-flex bg-yellow-100 h-10 font-semibold justify-center items-center ring ring-yellow-400 rounded-md ring-inset">
						<Image src={Google} className="w-6 inline-flex" alt="Google Icon" />
						<div className="ml-1.5">Google</div>
					</button>
					<button className="inline-flex bg-gray-200 h-10 font-semibold justify-center ring ring-inset ring-gray-500 rounded-md items-center">
						<div>
							<Image
								src={Github}
								alt="Github Icon"
								className="w-6 inline-flex"
							/>
						</div>
						<div className="ml-1.5">Github</div>
					</button>
				</div>
				<p className="mt-10 text-center text-sm text-gray-500">
					Not a member?{" "}
					<Link
						href="/signup"
						className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
					>
						Sign up now
					</Link>
				</p>
			</div>
		</div>
	);
}
