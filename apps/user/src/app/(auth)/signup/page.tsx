"use client";
import React from "react";
import Image from "next/image";
import Ethereum from "@/assets/ethereum-svgrepo-com.svg";
import { signUp, SignUpState } from "@/_actions/auth.action";
import { useFormState } from "react-dom";

const Page = () => {
	const initialState: SignUpState = {};
	const [error, formAction] = useFormState(signUp, initialState);
	let formError;
	if (error && error.errors) {
		formError = error.errors.reduce<{ [key: string]: string }>((acc, err) => {
			acc[err.path] = err.message;
			return acc;
		}, {});
	}
	console.log(formError);
	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md py-3 shadow-md">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<Image
						alt="Ethereum"
						src={Ethereum}
						className="mx-auto h-10 w-auto ring-2 ring-gray-700 rounded-full"
					/>
					<h2 className="mt-10 mx-auto text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Sign up to our community.
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					{error &&
						error.errors?.map((error, index) => (
							<div key={index}>
								{error.path}
								{error.message}
							</div>
						))}
					<form action={formAction} className="space-y-6">
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Name
							</label>
							<div className="mt-2">
								<input
									id="name"
									name="name"
									type="text"
									required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Email address
							</label>
							<div className="mt-2">
								<input
									id="email"
									name="email"
									type="email"
									required
									autoComplete="email"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Password
								</label>
							</div>
							<div className="mt-2">
								<input
									id="password"
									name="password"
									type="password"
									required
									autoComplete="current-password"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="passwordConfirm"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									PasswordConfirm
								</label>
							</div>
							<div className="mt-2">
								<input
									id="passwordConfirm"
									name="passwordConfirm"
									type="password"
									required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="flex  w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Sign Up
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Page;
