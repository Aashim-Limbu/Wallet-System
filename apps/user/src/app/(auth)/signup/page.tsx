"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Ethereum from "@/assets/ethereum-svgrepo-com.svg";
import { signUp, SignUpState } from "@/_actions/auth.action";
import { useFormState } from "react-dom";
import { signUpSchema } from "@repo/common/authSchema";
import { z } from "zod";
type formError = Partial<z.infer<typeof signUpSchema>>;
const Page = () => {
	const initialState: SignUpState = {};
	const [formError, setFormError] = useState<formError>({});
	const [error, formAction] = useFormState(signUp, initialState);
	useEffect(() => {
		if (error && error.errors) {
			const newFormErrors = error.errors.reduce<{ [key: string]: string }>(
				(acc, err) => {
					acc[err.path] = err.message;
					return acc;
				},
				{}
			);
			setFormError(newFormErrors);
		}
	}, [error]);
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
					<form action={formAction} className="space-y-6">
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Name
							</label>
							<div className="mt-2">
								{formError.name && <div className="text-red-600 leading-5 tracking-tighter text-sm">{formError.name}</div>}
								<input
									id="name"
									name="name"
									type="text"
									required
									className={`px-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${formError.name && "ring-red-600 focus:ring-red-600"}`}
								/>
							</div>
						</div>
						<div>
							<label
								htmlFor="email"
								className={`block text-sm font-medium leading-6 text-gray-900`}
							>
								Email address
							</label>
							<div className="mt-2">
								{formError.email && (
									<div className="text-sm leading-5 tracking-tighter  text-red-600">
										{formError.email}
									</div>
								)}
								<input
									id="email"
									name="email"
									type="email"
									required
									autoComplete="email"
									className={`block px-1.5 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${formError.email && "ring-red-600 focus:ring-red-600"}`}
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
								{formError.password && (
									<div className="text-sm leading-tight tracking-tighter   text-red-600">
										{formError.password}
									</div>
								)}
								<input
									id="password"
									name="password"
									type="password"
									required
									autoComplete="current-password"
									className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${formError.password && "ring-red-600 focus:ring-red-600"}`}
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
								{formError.passwordConfirm && (
									<div className="text-sm leading-5 tracking-tighter  text-red-600">
										{formError.passwordConfirm}
									</div>
								)}
								<input
									id="passwordConfirm"
									name="passwordConfirm"
									type="password"
									required
									className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${formError.password && "ring-red-600 focus:ring-red-600"}`}
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
