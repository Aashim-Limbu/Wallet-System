"use client";

import { ReactNode, ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {
	children: ReactNode;
	variant: "Primary" | "Secondary";
	className?: string;
}

export const Button = ({
	children,
	variant,
	className,
	...props
}: ButtonProps) => {
	return (
		<button
			type="button"
			className={`rounded-md px-2.5 py-1.5 text-sm font-semibold shadow-sm ${variant === "Secondary" ? "bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50" : "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"} ${className}`}
			{...props}
		>
			{children}
		</button>
	);
};
