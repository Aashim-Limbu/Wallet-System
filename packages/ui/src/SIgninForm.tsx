"use client";
import NextImage from "next/image";
import Logo from "../assets/bitpay-svgrepo-com.svg";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import FormGroup from "./FormGroup";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { Button } from "@headlessui/react";
import { toast, Toaster } from "sonner";
type ReturnTypeofSigninAction = Promise<
	Partial<{ [index: string]: string | boolean }>
>;
export default function SigninForm({
	signinAction,
}: {
	signinAction: (
		prevState: unknown,
		formdata: FormData
	) => ReturnTypeofSigninAction;
}) {
	const [error, action, isPending] = useActionState(signinAction, {});
	const [currentData, setCurrentData] = useState({
		email: "",
		password: "",
	});
	const [shouldChange, setShouldChange] = useState(false);
	const errorUrl = {
		error:
			useSearchParams().get("error") === "OAuthAccountNotLinked" &&
			"Email already is in use with different provider",
	};
	useEffect(() => {
		if (error.error) {
			toast.error(error.error);
		}
		if (errorUrl.error) {
			toast.error(errorUrl.error);
		}
		if (error.success) {
			toast.success(error.success);
		}
	}, [error]);
	useEffect(() => {
		if (typeof error.change === "boolean" && error.change !== shouldChange) {
			setShouldChange(error.change);
		}
	}, [error.change, shouldChange]);
	return (
		<div className="flex min-h-full flex-1 flex-col justify-center py-4 sm:px-6 lg:px-8 not-prose">
			<div className="sm:mx-auto sm:w-full sm:max-w-[480px]">
				<NextImage
					alt="Your Company"
					src={Logo}
					className="mx-auto h-10 w-auto ring ring-2 ring-indigo-500 rounded-full"
				/>
				<h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Sign in to your account
				</h2>
			</div>
			<div className="mt-5 sm:mx-auto sm:w-full sm:max-w-[480px]">
				<div className="bg-white px-6 py-6 shadow sm:rounded-lg sm:px-12">
					<form
						action={async (formdata) => {
							if (!formdata.get("code")) {
								const data = {
									email: formdata.get("email") as string,
									password: formdata.get("password") as string,
								};
								setCurrentData({ ...data });
								action(formdata);
							} else {
								const code = formdata.get("code") as string;
								console.log(currentData);
								const newFormdata = new FormData();
								newFormdata.append("email", currentData.email);
								newFormdata.append("password", currentData.password);
								newFormdata.append("code", code);
								action(newFormdata);
							}
						}}
						className="space-y-4"
					>
						{!shouldChange ? (
							<>
								<FormGroup
									name="email"
									label="Email"
									type="email"
									// error={error.email}
								/>
								<FormGroup
									name="password"
									label="Password"
									type="password"
									// error={error.password}
								/>
								{(error.error || errorUrl.error) && (
									<div className="rounded-md bg-red-50 p-4">
										<div className="flex">
											<div className="flex-shrink-0">
												<XCircleIcon
													aria-hidden="true"
													className="h-5 w-5 text-red-400"
												/>
											</div>
											<div className="ml-3">
												<h3 className="text-sm font-medium text-red-800">
													{error.error || errorUrl.error}
												</h3>
												<div className="mt-2 text-sm text-red-700"></div>
											</div>
										</div>
									</div>
								)}
								<div className="flex items-center justify-between">
									<div className="flex items-center">
										<input
											id="remember-me"
											name="remember-me"
											type="checkbox"
											className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
										/>
										<label
											htmlFor="remember-me"
											className="ml-3 block text-sm leading-6 text-gray-900"
										>
											Remember me
										</label>
									</div>

									<div className="text-sm leading-6">
										<Link
											href="/reset-password"
											target="_blank"
											rel="noopener noreferrer"
											className="font-semibold text-indigo-600 hover:text-indigo-500"
										>
											Forgot password?
										</Link>
									</div>
								</div>
							</>
						) : (
							<>
								<div className="w-full flex justify-center mt-0">
									<span className="font-bold text-xl mx-auto">
										Verification Code
									</span>
								</div>
								<FormGroup name="code" type="text" />
							</>
						)}
						<div>
							<button
								type="submit"
								disabled={isPending}
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								{shouldChange
									? isPending
										? "Confirming ..."
										: "Confirm"
									: isPending
										? "Signing in ..."
										: "Sign in"}
							</button>
						</div>
					</form>

					<div>
						<div className="relative mt-10">
							<div
								aria-hidden="true"
								className="absolute inset-0 flex items-center"
							>
								<div className="w-full border-t border-gray-200" />
							</div>
							<div className="relative flex justify-center text-sm font-medium leading-6">
								<span className="bg-white px-6 text-gray-900">
									Or continue with
								</span>
							</div>
						</div>

						<div className="mt-6 grid grid-cols-2 gap-4">
							<Button
								onClick={() => {
									signIn("google", { redirectTo: "/" });
								}}
								className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
							>
								<svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
									<path
										d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
										fill="#EA4335"
									/>
									<path
										d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
										fill="#4285F4"
									/>
									<path
										d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
										fill="#FBBC05"
									/>
									<path
										d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
										fill="#34A853"
									/>
								</svg>
								<span className="text-sm font-semibold leading-6">Google</span>
							</Button>

							<Button
								onClick={() => signIn("github", { redirectTo: "/" })}
								className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
							>
								<svg
									fill="currentColor"
									viewBox="0 0 20 20"
									aria-hidden="true"
									className="h-5 w-5 fill-[#24292F]"
								>
									<path
										d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
										clipRule="evenodd"
										fillRule="evenodd"
									/>
								</svg>
								<span className="text-sm font-semibold leading-6">GitHub</span>
							</Button>
						</div>
					</div>
				</div>

				<p className="mt-10 text-center text-sm text-gray-500">
					Not a member?{" "}
					<Link
						href="/register "
						className="font-semibold underline leading-6 text-indigo-600 hover:text-indigo-500"
					>
						Join us
					</Link>
				</p>
			</div>
			<Toaster richColors position="top-center" />
		</div>
	);
}
