import Button from "@repo/ui/button";
import Github from "../assets/icons8-github.svg";
import Google from "../assets/icons8-google.svg";
import Image from "next/image";
import React from "react";
export default function SigninPage() {
	return (
		<div className="min-h-full flex flex-col justify-center py-8 px-6">
			<div className="mx-auto sm:max-w-sm md:max-w-md ">
				<p className="text-center text-xl font-bold tracking-tighter">Sign in to your Account</p>
			</div>
			<div className="mx-auto sm:w-full sm:max-w-sm md:max-w-md mt-8 bg-white rounded-lg shadow-lg p-6">
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
				<div className="mt-12 relative text-gray-900 font-semibold text-sm">
					<div className="bg-gray-600 w-full h-0.5"></div>
					<p className="bg-white text-gray-700 px-4 absolute left-1/2 -translate-x-1/2 -top-1/2 -translate-y-1/2 py-0.5">
						Or Continue With
					</p>
				</div>
				<div className="grid grid-cols-2 gap-x-5 justify-items-stretch mt-6 px-4">
					<button className="inline-flex bg-yellow-100 font-semibold justify-center items-center ring ring-yellow-400 px-4 rounded-md ring-inset">
						<Image src={Google} width={20} height={20} alt="Google Icon" />
						<span className="ml-1.5">Google</span>
					</button>
					<button className="inline-flex bg-gray-200 font-semibold px-4 py-2 justify-center ring ring-inset ring-gray-500 rounded-md items-center">
						<Image src={Github} alt="Github Icon" width={20} height={20} />
						<span className="ml-1.5">Github</span>
					</button>
				</div>
			</div>
		</div>
	);
}
