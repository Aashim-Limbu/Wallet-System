"use client";
import NextImage from "next/image";
import Logo from "../assets/bitpay-svgrepo-com.svg";
import { useActionState, useEffect } from "react";
import Link from "next/link";
import FormGroup from "./FormGroup";
import { toast, Toaster } from "sonner";
export default function RegistrationForm({
	registerUser,
}: {
	registerUser: any;
}) {
	const [error, action, isPending] = useActionState<{
		[index: string]: string;
	}>(registerUser, {});
	useEffect(() => {
		if (error.error) {
			toast.error(error.error);
		}
		if (error.success) {
			toast.success(error.success);
		}
	}, [error]);
	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center py-4 sm:px-6 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					<NextImage
						alt="Your Company"
						src={Logo}
						className="mx-auto h-10 w-auto ring ring-2 ring-indigo-500 rounded-full"
					/>
					<h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Welcome to Registration
					</h2>
				</div>
				<div className="mt-5 sm:mx-auto sm:w-full sm:max-w-[480px]">
					<div className="bg-white px-6 py-6 shadow sm:rounded-lg sm:px-12">
						<form action={action} className="space-y-6">
							<FormGroup
								name="name"
								label="Name"
								type="text"
								error={error.name}
							/>
							<FormGroup
								name="email"
								label="Email"
								type="email"
								error={error.email}
							/>
							<FormGroup
								name="password"
								label="Password"
								type="password"
								error={error.password}
							/>
							<FormGroup
								name="passwordConfirm"
								label="Password Confirm"
								type="password"
								error={error.passwordConfirm}
							/>
							<div>
								<button
									type="submit"
									disabled={isPending}
									className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								>
									{isPending ? "Loading..." : "Sign up"}
								</button>
							</div>
						</form>
						<p className="mt-10 text-center text-sm text-gray-500">
							Already a member?
							<Link
								href="/login"
								className="font-semibold ml-2 underline leading-6 text-indigo-600 hover:text-indigo-500"
							>
								Login
							</Link>
						</p>
					</div>
				</div>
				<Toaster richColors position="top-center" />
			</div>
		</>
	);
}
