import React from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid";
import { Button } from "@repo/ui/button";
export default function P2pTransfer() {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
			<h1 className="text-indigo-950 text-2xl font-bold py-4">Transfer</h1>
			<div className="col-span-3 flex flex-col space-y-6 h-full p-8 lg:px-20 bg-white rounded-lg shadow-lg">
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
							<span id="price-currency" className="text-gray-500 sm:text-sm">
								NPR
							</span>
						</div>
					</div>
				</div>
				<div>
					<label
						htmlFor="account-number"
						className="block text-sm font-semibold leading-6 text-gray-900"
					>
						Account number
					</label>
					<div className="relative mt-2 rounded-md shadow-sm">
						<input
							id="account-number"
							name="account-number"
							type="text"
							placeholder="000-00-0000"
							className="block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
						<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
							<QuestionMarkCircleIcon
								aria-hidden="true"
								className="h-5 w-5 text-gray-400"
							/>
						</div>
					</div>
				</div>
                <Button variant="Primary">Transfer</Button>
			</div>
            <div className="col-span-4 grid grid-cols-3 mt-8 bg-white py-4 rounded-lg">
                <h1 className="text-xl font-semibold">Transfer History</h1>
                <div>
                    <div>History 1</div>
                </div>
            </div>
		</div>
	);
}
