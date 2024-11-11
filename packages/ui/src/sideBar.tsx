"use client";
import NextImage from "next/image";
import { ReactNode, useState } from "react";
import Logo from "../assets/bitpay-svgrepo-com.svg";
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	Menu,
	MenuButton,
	MenuItems,
	TransitionChild,
} from "@headlessui/react";
import {
	BanknotesIcon,
	Bars3Icon,
	Cog6ToothIcon,
	HomeIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@repo/ui/button";
import {
	ArrowsRightLeftIcon,
	ChevronDownIcon,
	UserCircleIcon,
	UsersIcon,
} from "@heroicons/react/20/solid";

import { signOut, useSession } from "next-auth/react";
import SkeletonWrapper from "./Skeleton-Loader";
import Link from "next/link";
import { usePathname } from "next/navigation";
const navigation = [
	{ name: "Dashboard", href: "/", icon: HomeIcon, current: true },
	{
		name: "Transfer",
		href: "/transfer",
		icon: ArrowsRightLeftIcon,
	},
	{
		name: "Transaction",
		href: "/transaction",
		icon: BanknotesIcon,
	},
	{
		name: "P2P",
		href: "/p2p-transfer",
		icon: UsersIcon,
	},
];

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export default function SideBar({ children }: { children: ReactNode }) {
	const { data: session, status } = useSession();
	const pathName = usePathname();
	const user = session?.user;
	const [sidebarOpen, setSidebarOpen] = useState(false);
	return (
		<>
			<div className="h-full">
				<Dialog
					open={sidebarOpen}
					onClose={setSidebarOpen}
					className="relative z-50 lg:hidden"
				>
					<DialogBackdrop
						transition
						className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
					/>

					<div className="fixed inset-0 flex">
						<DialogPanel
							transition
							className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
						>
							<TransitionChild>
								<div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
									<button
										type="button"
										onClick={() => setSidebarOpen(false)}
										className="-m-2.5 p-2.5"
									>
										<span className="sr-only">Close sidebar</span>
										<XMarkIcon
											aria-hidden="true"
											className="h-6 w-6 text-white"
										/>
									</button>
								</div>
							</TransitionChild>
							{/* Sidebar component, swap this element with another sidebar if you like */}
							<div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
								<div className="flex h-16 shrink-0 items-center">
									<NextImage
										alt="Your Company"
										src={Logo}
										className="h-10 ring-2 ring-indigo-500 rounded-full w-auto"
									/>
								</div>
								<nav className="flex flex-1 flex-col">
									<ul role="list" className="flex flex-1 flex-col gap-y-7">
										<li>
											<ul role="list" className="-mx-2 space-y-1">
												{navigation.map((item) => (
													<li key={item.name}>
														<Link
															href={item.href}
															className={classNames(
																pathName === item.href
																	? "bg-gray-50 text-indigo-600"
																	: "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
																"group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
															)}
														>
															<item.icon
																aria-hidden="true"
																className={classNames(
																	pathName === item.href
																		? "text-indigo-600"
																		: "text-gray-400 group-hover:text-indigo-600",
																	"h-6 w-6 shrink-0"
																)}
															/>
															{item.name}
														</Link>
													</li>
												))}
											</ul>
										</li>
										<li className="mt-auto">
											<a
												href="#"
												className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
											>
												<Cog6ToothIcon
													aria-hidden="true"
													className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
												/>
												Settings
											</a>
										</li>
									</ul>
								</nav>
							</div>
						</DialogPanel>
					</div>
				</Dialog>

				{/* Static sidebar for desktop */}
				<div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
					{/* Sidebar component, swap this element with another sidebar if you like */}
					<div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
						<div className="flex h-16 shrink-0 items-center">
							<NextImage
								alt="Your Company"
								src={Logo}
								className="lg:h-10 md:h-8 h-6 w-auto ring-2 ring-indigo-800 rounded-full transition duration-150 hover:ring-indigo-300 hover:ease-in"
							/>
						</div>
						<nav className="flex flex-1 flex-col">
							<ul role="list" className="flex flex-1 flex-col gap-y-7">
								<li>
									<ul role="list" className="-mx-2 space-y-1">
										{navigation.map((item) => (
											<li key={item.name}>
												<Link
													href={item.href}
													className={classNames(
														pathName === item.href
															? "bg-gray-50 text-indigo-600"
															: "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
														"group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
													)}
												>
													<item.icon
														aria-hidden="true"
														className={classNames(
															pathName === item.href
																? "text-indigo-600"
																: "text-gray-400 group-hover:text-indigo-600",
															"h-6 w-6 shrink-0"
														)}
													/>
													{item.name}
												</Link>
											</li>
										))}
									</ul>
								</li>
								<li className="mt-auto">
									<a
										href="#"
										className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
									>
										<Cog6ToothIcon
											aria-hidden="true"
											className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
										/>
										Settings
									</a>
								</li>
							</ul>
						</nav>
					</div>
				</div>

				<div className="lg:pl-72 h-full bg-gray-200/50 ">
					<div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
						<button
							type="button"
							onClick={() => setSidebarOpen(true)}
							className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
						>
							<span className="sr-only">Open sidebar</span>
							<Bars3Icon aria-hidden="true" className="h-6 w-6" />
						</button>

						{/* Separator */}
						<div
							aria-hidden="true"
							className="h-6 w-px bg-gray-200 lg:hidden"
						/>

						<div className="flex flex-1 justify-end gap-x-4 self-stretch lg:gap-x-6">
							<div className="flex items-center  gap-x-4 lg:gap-x-6">
								{/* Separator */}
								<div
									aria-hidden="true"
									className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
								/>

								{/* Profile dropdown */}
								<Menu as="div" className="relative">
									<MenuButton className="-m-1.5 flex items-center p-1.5">
										<span className="sr-only">Open user menu</span>
										{status === "authenticated" ? (
											<NextImage
												alt=""
												src={user?.image as string}
												className="h-8 w-8 rounded-full bg-gray-50"
												width={20}
												height={20}
											/>
										) : (
											<SkeletonWrapper>
												<UserCircleIcon className="w-10 text-gray-300" />
											</SkeletonWrapper>
										)}
										<span className="hidden lg:flex lg:items-center">
											{status === "authenticated" ? (
												<span
													aria-hidden="true"
													className="ml-4 text-sm font-semibold leading-6 text-gray-900"
												>
													{session.user?.name}
												</span>
											) : (
												<SkeletonWrapper>
													<div className="w-24 h-6 rounded bg-gray-200" />
												</SkeletonWrapper>
											)}

											<ChevronDownIcon
												aria-hidden="true"
												className="ml-2 h-5 w-5 text-gray-400"
											/>
										</span>
									</MenuButton>
									<MenuItems
										transition
										className="absolute right-0 z-10 mt-3 w-32 origin-top-right rounded-md bg-gray-100 p-1.5 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
									>
										{status === "authenticated" ? (
											<Button
												className="w-full rounded-md"
												variant="Secondary"
												onClick={() => signOut({ redirectTo: "/login" })}
											>
												Signout
											</Button>
										) : (
											<SkeletonWrapper>
												<div className="h-8 w-full ring-2 ring-gray-200 rounded-md bg-white" />
											</SkeletonWrapper>
										)}
									</MenuItems>
								</Menu>
							</div>
						</div>
					</div>

					<main className="py-10 flex flex-col">
						<div className="px-4 sm:px-6 lg:px-8">{children}</div>
					</main>
				</div>
			</div>
		</>
	);
}
