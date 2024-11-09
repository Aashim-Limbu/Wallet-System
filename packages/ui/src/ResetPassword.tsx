"use client";
import { useActionState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import FormGroup from "./FormGroup";
import { Button } from "./button";

type ReturnTypePasswordReset = Promise<Partial<{ [index: string]: string }>>;
export default function ResetPassword({
	resetAction,
}: {
	resetAction: (
		/* eslint-disable no-unused-vars */
		prevState: unknown,
		formData: FormData
	) => ReturnTypePasswordReset;
	/* eslint-enable no-unused-vars */
}) {
	const [state, action, isPending] = useActionState(resetAction, {});
	useEffect(() => {
		if (state && state.error) {
			toast.error(state.error);
		}
		if (state.success) {
			toast.success(state.success);
		}
	}, [state]);
	return (
		<div className="bg-white shadow sm:rounded-lg w-full sm:max-w-md md:max-w-lg">
			<Toaster duration={5000} position="top-center" richColors />
			<div className="px-4 py-5 sm:p-6">
				<h3 className="text-base font-semibold leading-6 text-gray-900">
					Confirm your Identity
				</h3>
				<div className="mt-2 max-w-xl text-sm text-gray-500">
					<p>Change the Password you want associated with your account.</p>
				</div>
				<form
					action={action}
					className="mt-5 sm:flex flex-col space-y-2 md:space-y-4 sm:items-center"
				>
					<div className="w-full">
						<FormGroup
							name="email"
							type="email"
							placeholder="elonmusk@gmail.com"
							error={state.email}
						/>
					</div>
					<Button type="submit" variant="Primary" className="w-full">
						{isPending ? "Checking" : "Check Email"}
					</Button>
				</form>
			</div>
		</div>
	);
}
