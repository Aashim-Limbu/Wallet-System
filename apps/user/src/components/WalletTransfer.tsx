"use client";
import { loadWallet } from "@/_actions/wallet.action";
import { Button } from "@repo/ui/button";
import { Select } from "@repo/ui/select";
import SkeletonWrapper from "@repo/ui/skeleton-loader";
import { Toaster, toast } from "sonner";
import { ReactNode, Suspense, useActionState, useEffect } from "react";
export default function AddWalllet({
	OnRampLists,
}: {
	OnRampLists: ReactNode;
}) {
	const [state, action] = useActionState(loadWallet, {});
	const banks = [
		{
			name: "NIC ASIA Bank",
			redirectUrl: "https://itouch.nicasiabank.com/login.xhtml",
		},
		{
			name: "Nepal Rastriya Bank",
			redirectUrl: "https://ebank.nepalbank.com.np/#/login",
		},
		{
			name: "Nepal Merchant Bank",
			redirectUrl: "https://ibank.nmb.com.np/#/login",
		},
	];
	useEffect(() => {
		if (state.error) {
			toast.error(state.error);
		}
		if (state.success) {
			toast.info("Redirecting....");
			window.open(state.success, "_blank");
		}
	}, [state]);
	return (
		<>
			<Toaster richColors duration={5 * 60 * 60} />
			<div className="grid grid-cols-2 py-8 space-x-4 not-prose">
				<form
					action={action}
					className="flex flex-col justify-between bg-white rounded-lg p-4 ring-1 ring-inset ring-gray-400 shadow-md"
				>
					<div>
						<div className="border-b-2  border-gray-400">
							<p className="text-xl py-1 font-semibold tracking-tight text-indigo-950">
								Load Wallet
							</p>
						</div>
						<div className="py-2 flex flex-col space-y-2">
							<div>
								<label
									htmlFor="amount"
									className="block text-sm md:text-md leading-6 font-semibold text-gray-900"
								>
									Price
								</label>
								<div className="relative mt-2 rounded-md shadow-sm">
									<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
										<span className="text-gray-500 sm:text-sm">रु</span>
									</div>
									<input
										id="amount"
										name="amount"
										type="text"
										placeholder="0.00"
										aria-describedby="price-currency"
										className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
									<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
										<span
											id="price-currency"
											className="text-gray-500 sm:text-sm"
										>
											NPR
										</span>
									</div>
								</div>
							</div>
							<div>
								<Select
									keyField="name"
									valueField="redirectUrl"
									label="Bank"
									name="bank"
									options={banks}
								/>
							</div>
						</div>
					</div>
					<div>
						<Button type="submit" className="w-full" variant="Primary">
							Add
						</Button>
					</div>
				</form>
				<div className="flex flex-col gap-y-4">
					<div className="bg-white p-4 rounded-lg ring-1 ring-inset ring-gray-400 shadow-md">
						<div className="border-b-2 border-gray-400 ">
							<p className="text-xl py-1 font-semibold tracking-tight text-indigo-950">
								Balance
							</p>
						</div>
						<div className="flex flex-col pt-2 space-y-2 tracking-tight text-zinc-800">
							<div className="flex justify-between border-1 border-b-2 border-gray-30 tracking-tight">
								<span>Unlocked Balance</span>
								<p className="text-gray-500">
									<span className="tracking-tighter font-semibold text-base text-stone-950 mr-1">
										{200}
									</span>
									/NPR
								</p>
							</div>
							<div className="flex justify-between border-1 border-b-2 border-gray-300">
								<span>Total Locked Balance</span>
								<p className="text-gray-500">
									<span className="tracking-tighter font-semibold text-base text-stone-950 mr-1">
										{0}
									</span>
									/NPR
								</p>
							</div>
							<div className="flex justify-between border-1 border-b-2 border-gray-300">
								<span>Total Balance</span>
								<p className="text-gray-500">
									<span className="tracking-tighter font-semibold text-base text-stone-950 mr-1">
										{200}
									</span>
									/NPR
								</p>
							</div>
						</div>
					</div>
					<div className="bg-white p-4 rounded-lg ring-1 ring-inset ring-gray-400 shadow-md ">
						<div className="border-b-2 border-gray-400">
							<p className="text-xl py-1 font-semibold tracking-tighter text-indigo-950">
								Recent Transactions
							</p>
						</div>
						<div className="grid divide-y-2 divide-gray-300 gap-y-2  w-full">
							<Suspense fallback={<OnRampSkeleton />}>{OnRampLists}</Suspense>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
function OnRampSkeleton() {
	return (
		<>
			<SkeletonWrapper>
				<div className="flex justify-between py-2 w-full">
					<div className="flex gap-1 flex-col w-1/2  font-semibold leading-4">
						<div className="h-4 w-1/2 bg-gray-300 rounded-lg" />
						<div className="h-4 w-1/3 bg-gray-300 rounded-lg" />
					</div>

					<div className="h-8 rounded-lg w-16 bg-gray-300" />
				</div>
			</SkeletonWrapper>
			<SkeletonWrapper>
				<div className="flex justify-between py-2 w-full">
					<div className="flex gap-1 flex-col w-1/2  font-semibold leading-4">
						<div className="h-4 w-1/2 bg-gray-300 rounded-lg" />
						<div className="h-4 w-1/3 bg-gray-300 rounded-lg" />
					</div>

					<div className="h-8 rounded-lg w-16 bg-gray-300" />
				</div>
			</SkeletonWrapper>
		</>
	);
}
