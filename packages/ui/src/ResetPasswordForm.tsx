"use client";
import { Button } from "./button";
import FormGroup from "./FormGroup";
import NextImage from "next/image";
import Logo from "../assets/bitpay-svgrepo-com.svg";
import { useActionState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import { useSearchParams } from "next/navigation";
type ResetPasswordReturnType = Promise<Partial<{ [index: string]: string }>>;
/* eslint-disable no-unused-vars */
type ResetPasswordAction = (
	token: string,
	prevState: unknown,
	formData: FormData
) => ResetPasswordReturnType;
/* eslint-enable no-unused-vars */
export default function ResetPasswordForm({
	changePassword,
}: {
	changePassword: ResetPasswordAction;
}) {
	const searchParam = useSearchParams();
	const token = searchParam.get("token");
	if (!token) return toast.error("Token not found");
	const bindChangePassword = changePassword.bind(null, token);
	const [state, action, isPending] = useActionState(bindChangePassword, {});
	useEffect(() => {
		if (state.error) {
			toast.error(state.error);
		}
		if (state.success) {
			toast.success(state.success);
		}
	}, [state]);
	return (
		<div className="flex min-h-full flex-1 flex-col justify-center not-prose px-6 py-12 lg:px-8">
			<Toaster position="top-center" richColors theme="system" />
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<NextImage
					alt="Your Company"
					src={Logo}
					className="mx-auto h-10 w-auto ring-2 ring-indigo-500 rounded-full p-1"
				/>
				<h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
					Reset Password
				</h2>
			</div>
			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form action={action} className="space-y-6">
					<FormGroup
						name="password"
						label="Password"
						type="password"
						error={state.password}
					/>
					<FormGroup
						name="passwordConfirm"
						label="Password Confirm"
						type="password"
						error={state.passwordConfirm}
					/>

					<div>
						<Button
							variant="Primary"
							type="submit"
							disabled={isPending}
							className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							{isPending ? "Loading..." : "Reset Password"}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
