import { Button } from "@repo/ui/button";
import React from "react";
async function AccountPage() {
	const banks = [
		{
			name: "NIC ASIA Bank",
			redirectUrl: "https://itouch.nicasiabank.com/login.xhtml",
		},
		{
			name: "NepalRastriya Bank",
			redirectUrl: "https://ebank.nepalbank.com.np/#/login",
		},
		{
			name: "Nepal Merchant Bank",
			redirectUrl: "https://ibank.nmb.com.np/#/login",
		},
	];
	return (
		<div>
			<div className="grid grid-cols-2 py-8 space-x-4 not-prose">
				<div className="flex flex-col justify-between bg-white rounded-lg p-4 ring-1 ring-inset ring-gray-400 shadow-md">
					<div>
						<div className="border-b-2  border-gray-400">
							<p className="text-xl py-1 font-semibold tracking-tight text-indigo-950">
								Load Wallet
							</p>
						</div>
						<div className="py-2 flex flex-col space-y-2">
							<div>
								<label
									htmlFor="price"
									className="block text-sm md:text-md leading-6 font-semibold text-gray-900"
								>
									Price
								</label>
								<div className="relative mt-2 rounded-md shadow-sm">
									<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
										<span className="text-gray-500 sm:text-sm">रु</span>
									</div>
									<input
										id="price"
										name="price"
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
								<label
									htmlFor="location"
									className="block text-sm leading-6 font-semibold text-gray-900"
								>
									Bank
								</label>
								<select
									id="location"
									name="location"
									defaultValue="Canada"
									className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
								>
									<option>NIC ASIA</option>
									<option>SAGARMATHA</option>
									<option>NEPAL RASTRIYA BANK</option>
								</select>
							</div>
						</div>
					</div>
					<div>
						<Button className="w-full" variant="Primary">
							Add
						</Button>
					</div>
				</div>
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
						<div className="flex flex-col py-2">
							<div className="flex justify-between">
								<div className="flex flex-col  font-semibold leading-4">
									<p className="text-sm">Recieved NPR.</p>
									<span className="text-zinc-500 text-xs ">{`Sat. Nov 9,2024`}</span>
								</div>
								<div>+Rs {200}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AccountPage;
